import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import Actions
import { fetchPost } from '../../PostActions';
// Import Selectors
import { useHistory, useParams } from 'react-router-dom';
import ArrowBack from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";

const PostDetail = ({ post }) => {
  const history = useHistory();

  // TODO: migrate to MUI Grid components
  return (
      <div className="container">
        <div className="row">
          <div className="col-4 col-sm-1">
            <IconButton onClick={history.goBack} aria-label="Back">
              <ArrowBack />
            </IconButton>
          </div>
          <div className="col">
            <h1>{post.title}</h1>
            <p>By {post.name}</p>
            <p>{post.content}</p>
          </div>
        </div>
      </div>
  );
}

const Loading = () => <div>Loading</div>;

export function PostDetailPage() {
  const { cuid } = useParams();
  const post = useSelector(state => state.posts.data.find(currentPost => (currentPost.cuid === cuid)));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!post) dispatch(fetchPost(cuid));
  }, [cuid, dispatch, post]);

  return (
    post
    ? <PostDetail post={post} />
    : <Loading />
  );
}
export default PostDetailPage;
