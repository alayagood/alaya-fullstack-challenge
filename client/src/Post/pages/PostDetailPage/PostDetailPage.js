import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Import Actions
import { fetchPost, updatePostRequest } from '../../PostActions';

// Import components
import { Button } from '@material-ui/core';
import { Image } from '../../../Image/components/Image';
import { uploadImage } from '../../../util/cloudinary';

const UPLOAD_NEW_PHOTO_MESSAGE = 'Upload a new photo';

export function PostDetailPage() {
  const [newPhotoMessageButton, setNewPhotoMessageButton] = useState(UPLOAD_NEW_PHOTO_MESSAGE);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { cuid } = useParams();
  const post = useSelector((state) => state.posts.data.find((currentPost) => currentPost.cuid === cuid));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!post) dispatch(fetchPost(cuid));
    // eslint-disable-next-line
  }, []);

  const handleNewImage = (e) => {
    uploadImage(e, setNewPhotoMessageButton, setIsButtonDisabled).then(({ url }) => {
      post.photoUrl = url;
      dispatch(updatePostRequest(post));
      setNewPhotoMessageButton(UPLOAD_NEW_PHOTO_MESSAGE);
      setIsButtonDisabled(false);
    });
  };

  return post ? (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>{post.title}</h1>
          <p>By {post.name}</p>
          <p>{post.content}</p>
          <Button variant="contained" color="secondary" component="label" disabled={isButtonDisabled}>
            {newPhotoMessageButton}
            <input
              type="file"
              hidden={true}
              accept={'image/*'}
              multiple={false}
              name="image"
              onChange={(e) => handleNewImage(e, setNewPhotoMessageButton, setIsButtonDisabled)}
            />
          </Button>
          <br />
          {post.photoUrl !== undefined && <Image className={'w-50 mt-4'} photoUrl={post.photoUrl} />}
        </div>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}

export default PostDetailPage;
