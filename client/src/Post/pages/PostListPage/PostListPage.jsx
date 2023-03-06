import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget';
import {
	addPostRequest,
	deletePostRequest,
	fetchPosts,
} from '../../PostActions';

function PostListPage() {
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.posts.data);

	useEffect(() => {
		dispatch(fetchPosts());
	}, []);

	const handleDeletePost = (post) => {
		// eslint-disable-next-line no-restricted-globals, no-alert
		if (confirm('Do you want to delete this post')) {
			dispatch(deletePostRequest(post));
		}
	};

	const handleAddPost = (post) => {
		dispatch(addPostRequest(post));
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-6">
					<PostCreateWidget addPost={handleAddPost} />
				</div>
				<div className="col-6">
					<PostList handleDeletePost={handleDeletePost} posts={posts} />
				</div>
			</div>
		</div>
	);
}

PostListPage.propTypes = {};

export default PostListPage;
