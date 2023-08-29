import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IPost } from '../../interfaces/Post';
import { getUserPosts } from '../../store/actions/Posts/postActions';
import PostListItem from '../../components/Post/PostListItem';
import { IPostState } from '../../interfaces/PostState';

const UserPostPage: React.FC = (): JSX.Element => {
  const [posts, setPosts] = useState<IPost[]>();
  const postsStore = useSelector((state: IPostState) => state.posts );
  const dispatch = useDispatch();

  useEffect(() => {

    if( postsStore.user_posts?.length ) {
      setPosts(postsStore.user_posts);
    } else {
      if(!postsStore.empty || postsStore.user_posts && postsStore?.user_posts.length === 0) {
        if(!posts) {
          dispatch(getUserPosts());
        }
        setPosts(postsStore.user_posts);
      }      
    }

  }, [dispatch, postsStore.user_posts]);

  return (
    <div className="container">
      <h2 className="mb-4">📄 My posts</h2>
      {
       posts?.length
        ?
        posts.map((post: IPost) => (
          <div className="col mb-3" key={post.cuid}>
          <PostListItem 
            post={post} 
          />
          </div>
        ))
        :
        'You have not created any post yet 😥'
      } 

    </div>
  )
};

export default UserPostPage;