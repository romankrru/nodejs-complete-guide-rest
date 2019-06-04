import {types} from './actions';

const initialState = {
	isSignUpLoading: false,
	error: null,
	isSignInLoading: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_ERROR:
			return {...state, error: action.error};

		case types.SIGNUP_START:
			return {...state, isSignUpLoading: true, error: null};

		case types.SIGNUP_SUCCESS:
			return {...state, isSignUpLoading: false, error: null};

		case types.SIGNUP_FAIL:
			return {
				...state,
				isSignUpLoading: false,
				error: action.error,
			};

		case types.SIGNIN_START:
			return {...state, isSignInLoading: true, error: null};

		case types.SIGNIN_SUCCESS:
			return {
				...state,
				isSignInLoading: false,
				error: null,
				data: action.data,
			};

		case types.SIGNIN_FAIL:
			return {
				...state,
				isSignInLoading: false,
				error: action.error,
			};

		default:
			return state;
	}
};

export default reducer;
