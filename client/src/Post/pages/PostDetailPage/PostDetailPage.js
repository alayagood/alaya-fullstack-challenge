import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../../../redux/actions/postActions';
import { useParams } from 'react-router-dom';

function PostDetailPage() {
  const { cuid } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
      state.posts.data.find((currentPost) => currentPost.cuid === cuid)
  );

  useEffect(() => {
    if (!post) {
      dispatch(fetchPost(cuid));
    }
  }, [cuid, dispatch, post]);

  return (
      <div className="container">
        {post ? (
            <div className="row">
              <div className="col-12">
                <h1>{post.title}</h1>
                <p>By {post.name}</p>
                <p>{post.content}</p>
                {post.images && post.images.length > 0 && (
                    <div>
                      <h3>Images</h3>
                      {post.images.map((image) => (
                          <img
                              key={image._id}
                              src={image.url}
                              alt={image.name}
                              style={{ maxWidth: '100%', marginBottom: '10px' }}
                          />
                      ))}
                    </div>
                )}
              </div>
            </div>
        ) : (
            <div>Loading</div>
        )}
      </div>
  );
}

export default PostDetailPage;
