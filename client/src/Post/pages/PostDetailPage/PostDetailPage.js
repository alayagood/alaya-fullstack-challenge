import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImageWidget from "../../components/UploadImageWidget";
// Import Actions
import { fetchPost, uploadImage } from "../../PostActions";
// Import Selectors
import { useParams } from "react-router-dom";

export function PostDetailPage() {
  const { cuid } = useParams();
  const post = useSelector((state) => {
    return state.posts.data[0];
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!post) dispatch(fetchPost(cuid));
  }, []);

  const handleUploadImage = (type, image) => {
    dispatch(uploadImage(post.post.cuid, type, image));
  };

  return post ? (
    <div className="container">
      <div className="row">
        <div className="col-9">
          <h1>{post.post.title}</h1>
          <p>{post.post.content}</p>
          {post.photos.mainPhoto && (
            <img
              src={`data:${post.photos.mainPhoto.contentType};base64,
            ${post.photos.mainPhoto.base64}`}
              width="800"
              height="500"
            />
          )}
        </div>
        <div className="col-3">
          <p>Post by {post.post.name}</p>
          {post.photos.profilePhoto && (
            <img
              src={`data:${post.photos.profilePhoto.contentType};base64,
            ${post.photos.profilePhoto.base64}`}
              width="200"
              height="200"
            />
          )}
        </div>
        <UploadImageWidget uploadImage={handleUploadImage} />
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}
export default PostDetailPage;
