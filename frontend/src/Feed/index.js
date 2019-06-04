import React, {useState, useEffect, useCallback, Fragment} from 'react';

import {Item, Dimmer, Loader, Button} from 'semantic-ui-react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';

import PostItem from './PostItem';
import Edit from './Edit';
import ErrorModal from '../generic/ErrorModal';
import Pagination from './Pagination';

import * as actions from './actions';
export {default as reducer} from './reducer';

const Feed = props => {
	const [activePage, setActivePage] = useState(1);
	const dispatch = useDispatch();

	const state = useSelector(
		state => ({
			posts: state.feed.posts,
			isEditingPost: state.feed.isEditingPost,
			editPostData: state.feed.editPostData,
			error: state.feed.error,
			fetchPostsLoading: state.feed.fetchPostsLoading,
			totalPages: state.feed.totalPages,
		}),

		shallowEqual,
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
					isEdit: Boolean(state.editPostData),
				}),
			).then(() => dispatch(actions.loadPosts(activePage))),

		[dispatch, state.editPostData, activePage],
	);

	return (
		<Fragment>
			<Button onClick={() => openEditPost(null)}>New Post</Button>

			<Edit
				onSubmit={submit}
				data={state.editPostData}
				isOpen={state.isEditingPost}
				close={closeEditPost}
			/>

			<ErrorModal error={state.error} close={closeError} />

			<Item.Group>
				{state.fetchPostsLoading ? (
					<Dimmer active inverted>
						<Loader inverted>Loading</Loader>
					</Dimmer>
				) : (
					state.posts.map(post => (
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
				totalPages={state.totalPages}
				activePage={activePage}
				setActivePage={setActivePage}
			/>
		</Fragment>
	);
};

export default Feed;
