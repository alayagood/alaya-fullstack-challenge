import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../../PostActions';
import { useParams } from 'react-router-dom';

export function PostDetailPage() {
  const { cuid } = useParams();
  const post = useSelector(state => state.posts.data.find(currentPost => (currentPost.cuid === cuid)));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!post) dispatch(fetchPost(cuid));
  }, []);

  return (post ? (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>{post.title}</h1>
            <p>By {post.name}</p>
            <p>{post.content}</p>
            {post.image && (
                <img
                    src={`data:image/jpeg;base64,${post.image}`}
                    alt="Post"
                    style={{ maxWidth: '100%', maxHeight: '300px' }} 
                />
            )}
          </div>
        </div>
      </div>
  ) : (
      <div>Loading</div>
  ));
}

export default PostDetailPage;
