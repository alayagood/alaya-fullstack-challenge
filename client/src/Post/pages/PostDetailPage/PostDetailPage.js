import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import Actions
import { deletePostRequest, fetchPost } from '../../PostActions';
// Import Selectors
import { useHistory, useParams } from 'react-router-dom';
import {getPost} from "../../PostReducer";
import PostListItem from "../../components/PostListItem"

export function PostDetailPage() {

  const { cuid } = useParams();
  const post = useSelector(state => getPost(state, cuid), undefined);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = () => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      dispatch(deletePostRequest(cuid)).then(()=> {
        history.push('/')
      });
    }
  }

  useEffect(() => {
    if (!post) dispatch(fetchPost(cuid));
  }, []);
  if (!post) {
    return <div>Loading</div>
  }

  return <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-md-6">
        <PostListItem post={post} onDelete={handleDelete}/>
      </div>
    </div>
  </div>;
}
export default PostDetailPage;
