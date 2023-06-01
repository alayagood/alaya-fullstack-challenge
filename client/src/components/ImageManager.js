import React, { useState, useEffect } from 'react'
import apiCaller from '../util/apiCaller'
import ImageItem from './ImageItem'
import ImageModal from './ImageModal'
import FileInput from './FileInput'
import Loading from './Loading'

const ImageManager = ({ postCuid }) => {
  const [images, setImages] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [imageSelected, setImageSelected] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalImage, setModalImage] = useState('')

  const closeModal = () => {
    setModalOpen(false)
  }

  const fetchImages = async () => {
    try {
      const response = await apiCaller(`posts/${postCuid}/images`, 'GET')
      setImages(response.data.images)
    } catch (error) {
      console.error('Error fetching images:', error)
    }
  }

  const deleteImage = async (assetId) => {
    try {
      await apiCaller(`posts/${postCuid}/images/${assetId}`, 'DELETE')
      await fetchImages()
    } catch (error) {
      console.error('Error deleting image:', error)
    }
  }

  const openModal = (img) => {
    setModalImage(img)
    setModalOpen(true)
  }

  const handleImageUpload = async () => {
    setLoading(true);
    const reader = new FileReader()
    reader.readAsDataURL(imageSelected)
    reader.onloadend = () => {
      uploadImage(reader.result)
    }
  }

  const uploadImage = async (base64EncodedImage) => {
    try {
      await apiCaller(`posts/${postCuid}/images`, 'POST', {image: base64EncodedImage})
      await fetchImages()
    } catch (err) {
      console.error('Error uploading image:', err)
    } finally {
      setLoading(false);
    }
  }

  const onImageSelected = (file) => {
    console.log('Image selected', file)
    setImageSelected(file)

  }

  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <div className="col-12">
      {isLoading
        ? <Loading/>
        : <FileInput onFileSelected={onImageSelected} onUpload={handleImageUpload}/>
      }
      <div className="image-list">
        {images.map((img) => (
          <ImageItem
            key={img.assetId}
            imageUrl={img.url}
            imageId={img.assetId}
            handleDeleteImage={deleteImage}
            openModal={() => openModal(img)}
          />
        ))}
      </div>
      {isModalOpen && (
        <ImageModal imageUrl={modalImage.url} closeModal={closeModal}/>
      )}
    </div>
  )
}

export default ImageManager
