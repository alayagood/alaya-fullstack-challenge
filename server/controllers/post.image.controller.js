const { cloudinary, postImageFolder } = require('../utils/cloudinary')
const Image = require('../models/image')
const imageResource = require('./resources/image.response')
const addImageToPost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' })
    }
    const folderPath = `${postImageFolder}\/${req.post.cuid}`
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: folderPath,
    })
    console.log('result', result)
    const newImage = new Image({
      imageUrl: result.secure_url,
      postId: req.post._id,
      assetId: result.asset_id,
      publicId: result.public_id,
    })

    await newImage.save()

    return res.status(201).json({ data: imageResource.response(result) })
  } catch (error) {
    console.error('Error uploading image:', error)
    return res.status(500).json({ error: 'Failed to upload image' })
  }
}

const deleteImageFromPost = async (req, res, next) => {
  try {
    await cloudinary.uploader.destroy(req.image.publicId)

    await Image.findByIdAndDelete(req.image._id)

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error removing image:', error)
    return res.status(500).json({ error: 'Failed to remove image' })
  }
}

const getImagesFromPost = async (req, res, next) => {
  try {
    const { folderPath } = req.post.cuid
    const { page, limit } = req.query

    const options = {
      type: 'upload',
      prefix: folderPath,
      max_results: limit
    }

    const result = await cloudinary.api.resources(options)

    const imageUrls = result.resources.map((image) => image.secure_url)

    return res.status(200).json({ imageUrls, nextCursor: result.next_cursor })
  } catch (error) {
    console.error('Error retrieving images:', error)
    return res.status(500).json({ error: 'Failed to retrieve images' })
  }
}

const getImage = async (req, res, next) => {
  try {
    const image = await cloudinary.api.resource(req.image.publicId)

    if (!image) {
      return res.status(404).json({ error: 'Image not found in Cloudinary' })
    }

    return res.status(200).json({ data: imageResource.response(image) })
  } catch (error) {
    console.error('Error retrieving image:', error)
    return res.status(500).json({ error: 'Failed to retrieve image' })
  }
}

module.exports = {
  addImageToPost,
  deleteImageFromPost,
  getImagesFromPost,
  getImage,
}