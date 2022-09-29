import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Import Actions
import { fetchPost } from '../../PostActions';

// Import Selectors
import { Image } from '../../../Image/components/Image';

export function PostDetailPage() {
  const { cuid } = useParams();
  const post = useSelector((state) => state.posts.data.find((currentPost) => currentPost.cuid === cuid));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!post) dispatch(fetchPost(cuid));
    // eslint-disable-next-line
  }, []);

  return post ? (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>{post.title}</h1>
          <p>By {post.name}</p>
          <p>{post.content}</p>
          {post.photoUrl !== undefined && <Image className={'w-50'} photoUrl={post.photoUrl} />}
        </div>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}

export default PostDetailPage;
