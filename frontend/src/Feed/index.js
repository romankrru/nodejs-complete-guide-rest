import React, {useReducer, useEffect, Fragment} from 'react';
import {Item, Dimmer, Loader, Button} from 'semantic-ui-react';

import PostItem from './PostItem';
import Edit from './Edit';
import ErrorModal from '../generic/ErrorModal';

const actionTypes = {
	SET_POSTS: 'SET_POSTS',
	SET_LOADING: 'SET_LOADING',
	CLOSE_POST_MODAL: 'CLOSE_POST_MODAL',
	OPEN_CREATE_POST_MODAL: 'OPEN_CREATE_POST_MODAL',
	OPEN_EDIT_POST_MODAL: 'OPEN_EDIT_POST_MODAL',
	SET_ERROR: 'SET_ERROR',
};

const savePost = ({data, isEdit}) => {
	const formData = new FormData();

	formData.append('title', data.title);
	formData.append('content', data.content);
	formData.append('image', data.image);
	formData.append('imageUrl', data.imageUrl);

	const url = isEdit
		? `${process.env.REACT_APP_API_URL}/feed/post/${data.id}`
		: `${process.env.REACT_APP_API_URL}/feed/post`;

	return fetch(url, {
		method: isEdit ? 'PUT' : 'POST',
		body: formData,
	}).then(res => {
		if (![200, 201].includes(res.status))
			throw new Error(
				'Error while creating or updating post! Please try again.',
			);

		return res.json();
	});
};

const reducer = (state, action) => {
	switch (action.type) {
		case actionTypes.SET_POSTS:
			return {...state, posts: action.posts};

		case actionTypes.SET_LOADING:
			return {...state, loading: action.loading};

		case actionTypes.OPEN_CREATE_POST_MODAL:
			return {...state, isCreatePostModalOpen: true};

		case actionTypes.CLOSE_POST_MODAL:
			return {
				...state,
				isCreatePostModalOpen: false,
				isEditPostModalOpen: false,
				editPostModalData: null,
			};

		case actionTypes.OPEN_EDIT_POST_MODAL:
			return {
				...state,
				isEditPostModalOpen: true,
				editPostModalData: action.data,
			};

		case actionTypes.SET_ERROR:
			return {...state, error: action.error};

		default:
			return state;
	}
};

const Feed = props => {
	const [state, dispatch] = useReducer(reducer, {
		error: null,
		posts: [],
		loading: true,
		isCreatePostModalOpen: false,
		isEditPostModalOpen: false,
		editPostModalData: null,
	});

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/feed/posts`)
			.then(res => res.json())

			.then(posts => {
				dispatch({
					type: actionTypes.SET_POSTS,
					posts: posts,
				});
			})

			.catch(err => console.error(err))

			.finally(() =>
				dispatch({
					type: actionTypes.SET_LOADING,
					loading: false,
				}),
			);
	}, []);

	const submit = (postData, formActions) => {
		const isEdit = state.isEditPostModalOpen;

		dispatch({type: actionTypes.SET_ERROR, error: null});

		savePost({data: postData, isEdit: isEdit})
			.then(data => {
				const updatedPosts = isEdit
					? state.posts.map(post => {
							if (post._id === state.editPostModalData.id)
								return data.post;

							return post;
					  })
					: [data.post, ...state.posts];

				dispatch({
					type: actionTypes.SET_POSTS,
					posts: updatedPosts,
				});

				dispatch({type: actionTypes.CLOSE_POST_MODAL});
			})

			.catch(err => {
				console.error(err);
				dispatch({type: actionTypes.SET_ERROR, error: err});
			})

			.finally(() => {
				formActions.setSubmitting(false);
			});
	};

	const openEditModal = data =>
		dispatch({type: actionTypes.OPEN_EDIT_POST_MODAL, data: data});

	return (
		<Fragment>
			<Button
				onClick={() =>
					dispatch({type: actionTypes.OPEN_CREATE_POST_MODAL})
				}
			>
				New Post
			</Button>

			<Edit
				onSubmit={submit}
				data={state.editPostModalData}
				isOpen={
					state.isCreatePostModalOpen || state.isEditPostModalOpen
				}
				close={() =>
					dispatch({
						type: actionTypes.CLOSE_POST_MODAL,
					})
				}
			/>

			<ErrorModal
				error={state.error}
				close={() =>
					dispatch({type: actionTypes.SET_ERROR, error: null})
				}
			/>

			<Item.Group>
				{state.loading ? (
					<Dimmer active inverted>
						<Loader inverted>Loading</Loader>
					</Dimmer>
				) : (
					state.posts.map(post => (
						<PostItem
							key={post._id}
							id={post._id}
							imageUrl={post.imageUrl}
							edit={openEditModal}
							authorName={post.creator.name}
							title={post.title}
							createdAt={post.createdAt}
							content={post.content}
						/>
					))
				)}
			</Item.Group>
		</Fragment>
	);
};

export default Feed;
