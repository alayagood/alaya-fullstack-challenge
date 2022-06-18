import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import Actions
import { fetchPost, getPosts } from "../../../redux/posts";
// Import Selectors
import { useParams } from "react-router-dom";

export function PostDetailPage() {
  const { cuid } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);

  const post = useMemo(
    () => posts.data.find((_post) => _post.cuid === cuid),
    [cuid, posts]
  );

  useEffect(() => {
    if (!post) dispatch(fetchPost(cuid));
  }, [cuid, dispatch, post]);

  return post ? (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>{post.title}</h1>
          <p>By {post.name}</p>
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}
export default PostDetailPage;
