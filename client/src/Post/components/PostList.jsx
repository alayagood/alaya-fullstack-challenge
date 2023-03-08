import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import PostListItem from './PostListItem';

function PostList({ posts, handleDeletePost, handleUploadPostPhoto }) {
	return (
		<div className="d-flex flex-column w-100">
			<h3 className="mt-4">Posts</h3>
			{posts.map((post) => (
				<PostListItem
					post={post}
					key={post.cuid}
					onDelete={() => handleDeletePost(post.cuid)}
					onUploadPhoto={handleUploadPostPhoto}
				/>
			))}
		</div>
	);
}

PostList.propTypes = {
	posts: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			content: PropTypes.string.isRequired,
			slug: PropTypes.string.isRequired,
			cuid: PropTypes.string.isRequired,
		})
	).isRequired,
	handleDeletePost: PropTypes.func.isRequired,
	handleUploadPostPhoto: PropTypes.func.isRequired,
};

export default PostList;
