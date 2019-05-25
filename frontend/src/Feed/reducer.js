import {types} from './actions';

const initialState = {
	error: null,
	fetchPostsLoading: false,
	deletePostLoading: false,
	savePostLoading: false,
	posts: [],
	totalCount: 0,
	totalPages: 0,
	isEditingPost: false,
	editPostData: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_POSTS:
			return {...state, posts: action.posts};

		case types.SET_ERROR:
			return {...state, error: action.error};

		case types.LOAD_POSTS_START:
			return {...state, error: null, fetchPostsLoading: true};

		case types.LOAD_POSTS_SUCCESS:
			return {
				...state,
				error: null,
				fetchPostsLoading: false,
				posts: action.posts,
				totalCount: action.totalCount,
				totalPages: action.totalPages,
			};

		case types.LOAD_POSTS_FAIL:
			return {
				...state,
				error: action.error,
				fetchPostsLoading: false,
			};

		case types.START_EDIT_POST:
			return {
				...state,
				isEditingPost: true,
				editPostData: action.editPostData,
			};

		case types.STOP_EDIT_POST:
			return {
				...state,
				isEditingPost: false,
				editPostData: null,
			};

		case types.DELETE_POST_START:
			return {
				...state,
				error: null,
				deletePostLoading: true,
			};

		case types.DELETE_POST_SUCCESS:
			return {
				...state,
				error: null,
				deletePostLoading: false,
				posts: state.posts.filter(post => post._id !== action.postId),
			};

		case types.DELETE_POST_FAIL:
			return {
				...state,
				deletePostLoading: false,
				error: action.error,
			};

		case types.SAVE_POST_START:
			return {
				...state,
				savePostLoading: true,
				error: null,
			};

		case types.SAVE_POST_SUCCESS:
			return {
				...state,
				savePostLoading: false,
				error: null,
				isEditingPost: false,
				editPostData: null,
			};

		case types.SAVE_POST_FAIL:
			return {
				...state,
				savePostLoading: false,
				error: action.error,
			};

		default:
			return state;
	}
};

export default reducer;
