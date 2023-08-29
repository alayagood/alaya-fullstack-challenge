import React, { useEffect } from 'react';
import PostList from '../../../components/Post/PostList';
import { connect } from 'react-redux';
import { getPosts } from '../../../store/actions/Posts/postActions';
import { IPost } from '../../../interfaces/Post';
import Loader from '../../../components/Loader/Loader';
import Error from '../../../components/Error/Error';
import { Dispatch } from 'redux';
import { IPostState } from '../../../interfaces/PostState';

interface IPostListPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>; 
  posts: IPost[];
  errors: boolean;
  loading: boolean;
}

const PostListPage: React.FC<IPostListPageProps> = ({ dispatch, posts, loading, errors }) => {
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  let componentToShow: JSX.Element | null = null; // Initialize as null

  if (posts.length > 0) {
    componentToShow = <PostList posts={posts} />;
  }
  if (errors) {
    componentToShow = <Error error="There has been an error" />;
  }
  if (loading) {
    componentToShow = <Loader />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex align-items-center">
          <h1>
            <span role="img" aria-label="newspaper">
              📰
            </span>
            Recent posts
          </h1>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12">
          {componentToShow}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IPostState) => ({
  posts: state.posts.posts,
  errors: state.posts.errors,
  loading: state.posts.loading,
});

export default connect(mapStateToProps)(PostListPage);
