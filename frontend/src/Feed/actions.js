export const types = {
	SET_POSTS: 'SET_POSTS',
	SET_ERROR: 'SET_ERROR',

	LOAD_POSTS_SUCCESS: 'LOAD_POSTS_SUCCESS',
	LOAD_POSTS_START: 'LOAD_POSTS_START',
	LOAD_POSTS_FAIL: 'LOAD_POSTS_FAIL',

	SAVE_POST_SUCCESS: 'SAVE_POST_SUCCESS',
	SAVE_POST_START: 'SAVE_POST_START',
	SAVE_POST_FAIL: 'SAVE_POST_FAIL',

	START_EDIT_POST: 'START_EDIT_POST',
	STOP_EDIT_POST: 'STOP_EDIT_POST',

	DELETE_POST_SUCCESS: 'DELETE_POST_SUCCESS',
	DELETE_POST_START: 'DELETE_POST_START',
	DELETE_POST_FAIL: 'DELETE_POST_FAIL',
};

export const setPosts = posts => ({type: types.SET_POSTS, posts: posts});
export const setError = error => ({type: types.SET_ERROR, error: error});

//  FETCH POSTS

const loadPostsSuccess = ({posts, totalCount, totalPages}) => ({
	type: types.LOAD_POSTS_SUCCESS,
	posts: posts,
	totalCount: totalCount,
	totalPages: totalPages,
});

const loadPostsStart = () => ({type: types.LOAD_POSTS_START});

const loadPostsFail = err => ({
	type: types.LOAD_POSTS_FAIL,
	error: err,
});

export const loadPosts = page => dispatch => {
	dispatch(loadPostsStart());

	// FIXME: abort prev req
	return fetch(`${process.env.REACT_APP_API_URL}/feed/posts?page=${page}`)
		.then(res => {
			if (res.status !== 200) {
				throw new Error('Error while loading posts! Please try again.');
			}

			return res.json();
		})

		.then(data =>
			dispatch(
				loadPostsSuccess({
					posts: data.posts,
					totalCount: data.totalCount,
					totalPages: data.totalPages,
				}),
			),
		)

		.catch(err => {
			console.error(err);
			dispatch(loadPostsFail(err));
		});
};

// SAVE POST

const savePostStart = () => ({type: types.SAVE_POST_START});
const savePostSuccess = () => ({type: types.SAVE_POST_SUCCESS});
const savePostFail = error => ({type: types.SAVE_POST_FAIL, error: error});

export const savePost = ({data, isEdit}) => dispatch => {
	dispatch(savePostStart);
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
	})
		.then(res => {
			if (![200, 201].includes(res.status))
				throw new Error(
					'Error while creating or updating post! Please try again.',
				);

			return res.json();
		})

		.then(data => dispatch(savePostSuccess()))

		.catch(err => {
			console.error(err);
			dispatch(savePostFail(err));
		});
};

// EDIT POST

export const startEditPost = editPostData => ({
	type: types.START_EDIT_POST,
	editPostData: editPostData,
});

export const stopEditPost = () => ({
	type: types.STOP_EDIT_POST,
});

// DELETE POST

const deletePostStart = () => ({type: types.DELETE_POST_START});

const deletePostSuccess = postId => ({
	type: types.DELETE_POST_SUCCESS,
	postId: postId,
});

const deletePostFail = error => ({type: types.deletePostFail, error: error});

export const deletePost = postId => dispatch => {
	dispatch(deletePostStart());

	return fetch(`${process.env.REACT_APP_API_URL}/feed/post/${postId}`, {
		method: 'DELETE',
	})
		.then(res => {
			if (res.status !== 200) {
				throw new Error('Error while deleting post!');
			}

			return res.json();
		})

		.then(() => dispatch(deletePostSuccess(postId)))

		.catch(err => {
			console.error(err);
			dispatch(deletePostFail(err));
		});
};
