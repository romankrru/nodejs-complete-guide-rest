import React, {useState, useEffect, useCallback, Fragment} from 'react';

import {Item, Dimmer, Loader, Button} from 'semantic-ui-react';
import {useSelector, useDispatch} from 'react-redux';

import PostItem from './PostItem';
import Edit from './Edit';
import ErrorModal from '../generic/ErrorModal';
import Pagination from './Pagination';

import * as actions from './actions';
export {default as reducer} from './reducer';

const Feed = props => {
	const [activePage, setActivePage] = useState(1);
	const dispatch = useDispatch();
	const posts = useSelector(state => state.feed.posts);
	const isEditingPost = useSelector(state => state.feed.isEditingPost);
	const editPostData = useSelector(state => state.feed.editPostData);
	const error = useSelector(state => state.feed.error);
	const totalPages = useSelector(state => state.feed.totalPages);

	const fetchPostsLoading = useSelector(
		state => state.feed.fetchPostsLoading,
	);

	useEffect(() => {
		dispatch(actions.loadPosts(activePage));
	}, [activePage, dispatch]);

	const openEditPost = useCallback(
		postData => dispatch(actions.startEditPost(postData)),
		[dispatch],
	);

	const closeEditPost = useCallback(() => dispatch(actions.stopEditPost()), [
		dispatch,
	]);

	const deletePost = useCallback(
		postId =>
			dispatch(actions.deletePost(postId)).then(() =>
				dispatch(actions.loadPosts(activePage)),
			),

		[dispatch, activePage],
	);

	const closeError = useCallback(() => dispatch(actions.setError(null)), [
		dispatch,
	]);

	const submit = useCallback(
		postData =>
			dispatch(
				actions.savePost({
					data: postData,
					isEdit: Boolean(editPostData),
				}),
			).then(() => dispatch(actions.loadPosts(activePage))),

		[dispatch, editPostData, activePage],
	);

	return (
		<Fragment>
			<Button onClick={() => openEditPost(null)}>New Post</Button>

			<Edit
				onSubmit={submit}
				data={editPostData}
				isOpen={isEditingPost}
				close={closeEditPost}
			/>

			<ErrorModal error={error} close={closeError} />

			<Item.Group>
				{fetchPostsLoading ? (
					<Dimmer active inverted>
						<Loader inverted>Loading</Loader>
					</Dimmer>
				) : (
					posts.map(post => (
						<PostItem
							key={post._id}
							id={post._id}
							imageUrl={post.imageUrl}
							edit={openEditPost}
							delete={deletePost}
							authorName={post.creator.name}
							title={post.title}
							createdAt={post.createdAt}
							content={post.content}
						/>
					))
				)}
			</Item.Group>

			<Pagination
				totalPages={totalPages}
				activePage={activePage}
				setActivePage={setActivePage}
			/>
		</Fragment>
	);
};

export default Feed;
