import React, {useReducer, useEffect} from 'react';
import {Item, Dimmer, Loader, Button} from 'semantic-ui-react';

import Post from './Post';
import Edit from './Edit';
import Layout from '../generic/Layout';
import ErrorModal from '../generic/ErrorModal';

const actionTypes = {
	SET_POSTS: 'SET_POSTS',
	SET_LOADING: 'SET_LOADING',
	CLOSE_POST_MODAL: 'CLOSE_POST_MODAL',
	OPEN_CREATE_POST_MODAL: 'OPEN_CREATE_POST_MODAL',
	SET_ERROR: 'SET_ERROR',
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
			return {...state, isCreatePostModalOpen: false};

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
	});

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/feed/posts`)
			.then(res => res.json())

			.then(data =>
				dispatch({
					type: actionTypes.SET_POSTS,
					posts: data.posts,
				}),
			)

			.catch(err => console.error(err))

			.finally(() =>
				dispatch({
					type: actionTypes.SET_LOADING,
					loading: false,
				}),
			);
	}, []);

	const submit = postData => {
		dispatch({type: actionTypes.SET_ERROR, error: null});

		fetch(`${process.env.REACT_APP_API_URL}/feed/post`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(postData),
		})
			.then(res => {
				if (![200, 201].includes(res.status))
					throw new Error(
						'Error while creating or updating post! Please try again.',
					);

				return res.json();
			})

			.then(data => {
				console.log(data);

				dispatch({
					type: actionTypes.SET_POSTS,
					posts: [data.post, ...state.posts],
				});

				dispatch({type: actionTypes.CLOSE_POST_MODAL});
			})

			.catch(err => {
				console.error(err);
				dispatch({type: actionTypes.SET_ERROR, error: err});
			});
	};

	return (
		<Layout>
			<Button
				onClick={() =>
					dispatch({type: actionTypes.OPEN_CREATE_POST_MODAL})
				}
			>
				New Post
			</Button>

			<Edit
				onSubmit={submit}
				isOpen={state.isCreatePostModalOpen}
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
						<Post
							key={post._id}
							imageUrl={post.imageUrl}
							authorName={post.creator.name}
							title={post.title}
							createdAt={post.createdAt}
						>
							{post.content}
						</Post>
					))
				)}
			</Item.Group>
		</Layout>
	);
};

export default Feed;
