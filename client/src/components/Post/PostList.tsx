import React from 'react';

// Import Components
import PostListItem from './PostListItem';
import { IPost } from '../../interfaces/Post';
import { Link } from 'react-router-dom';
import './PostList.css';

interface IPostListProps {
  posts: IPost[];
}

const PostList: React.FC<IPostListProps> =({ posts }): JSX.Element => {
  return (
    <div className="d-flex flex-column w-100 postlist">
      {
       posts.length === 0
        ?
        <div className="d-flex">
        There are no post created, if you want to create new posts <Link className='postlist__link' to="/login"> login </Link> or <Link className='postlist__link' to="/register"> register </Link>.
        </div>
        :
        posts.map((post: IPost) => (
          <div className="col" key={post.cuid}>
            <PostListItem
              post={post}
            />
          </div>
        ))
      }
    </div>
  );
}

export default PostList;