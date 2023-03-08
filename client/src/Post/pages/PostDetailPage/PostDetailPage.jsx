import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPost, fetchPostMedia } from '../../PostActions';

function PostDetailPage() {
	const { cuid } = useParams();
	const post = useSelector((state) =>
		state.posts.data.find((currentPost) => currentPost.cuid === cuid)
	);
	const media = useSelector((state) =>
		state.posts.media.filter((currentMedia) => currentMedia.postCuid === cuid)
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (post) {
			dispatch(fetchPost(cuid));
			dispatch(fetchPostMedia(cuid));
		}
	}, []);

	return post ? (
		<div className="container">
			<div className="row">
				<div className="col-12">
					<h1>{post.title}</h1>
					<p>By {post.name}</p>
					<p>{post.content}</p>
				</div>
			</div>
			<div className="row overflow-x-scroll">
				{media.map((m) => (
					<img
						key={m.cuid}
						className="mx-3"
						src={m.url}
						alt={m.originalFilenames}
						style={{ height: '150px' }}
					/>
				))}
			</div>
		</div>
	) : (
		<div>Loading</div>
	);
}
export default PostDetailPage;
