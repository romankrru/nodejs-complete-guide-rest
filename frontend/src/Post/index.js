import React, {useReducer, useEffect} from 'react';
import {Segment, Image, Divider} from 'semantic-ui-react';

const initialState = {
	post: null,
	notFound: false,
	loading: true,
	error: null,
};

const actionTypes = {
	SET_POST: 'SET_POST',
	SET_NOT_FOUND: 'SET_NOT_FOUND',
	SET_ERROR: 'SET_ERROR',
};

const reducer = (state, action) => {
	switch (action.type) {
		case actionTypes.SET_POST:
			return {...state, post: action.post, loading: false};

		case actionTypes.SET_NOT_FOUND:
			return {...state, notFound: true, loading: false};

		case actionTypes.SET_ERROR:
			return {...state, error: action.error};

		default:
			return state;
	}
};

const Post = props => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/feed/post/${props.postId}`)
			.then(res => {
				if (res.status !== 200) {
					const err = new Error();
					err.statusCode = res.status;
					throw err;
				}

				return res.json();
			})

			.then(post => {
				dispatch({type: actionTypes.SET_POST, post: post});
			})

			.catch(err => {
				console.error(err);

				if (err.statusCode === 404) {
					return dispatch({type: actionTypes.SET_NOT_FOUND});
				}

				dispatch({type: actionTypes.SET_ERROR, error: err});
			});
	}, [props.postId]);

	if (state.notFound) return <p>Post not found!</p>;

	if (state.error) return <p>Some error occurred!</p>;

	return state.loading ? (
		<p>Loading</p>
	) : (
		<Segment>
			<h2>{state.post.title}</h2>
			<Divider />
			<Image
				src={`${process.env.REACT_APP_API_URL}/${state.post.imageUrl}`}
				size="medium"
				centered
			/>
			<p>{state.post.content}</p>
		</Segment>
	);
};

export default Post;
