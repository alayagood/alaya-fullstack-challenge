import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { awsUrl } from "../../../config.json";
// Import Actions
import { fetchPost } from '../../PostActions';
// Import Selectors
import { useParams } from 'react-router-dom';



export function PostDetailPage() {

  const { cuid } = useParams();
  const post = useSelector(state => state.posts.data.find(currentPost => (currentPost.cuid === cuid)));
  const dispatch = useDispatch();


  useEffect(() => {
    if (!post) dispatch(fetchPost(cuid));
  }, []);


  return (post
    ?
      (<div className="container">
        <div className="row">
          <div className="col-12">
            <h1>{post.title}</h1>
            <p>By {post.name}</p>
            <p>{post.content}</p>
          </div>
          <img
            className="align-baseline mw-100"
            src={`${awsUrl}/${post.image}`}
            loading="lazy"
          />
        </div>
      </div>)
    : (<div>Loading</div>)
  );
}
export default PostDetailPage;
