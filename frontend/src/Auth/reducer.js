import {types} from './actions';

const initialState = {
	isSignUpLoading: false,
	signUpError: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SIGNUP_START:
			return {...state, isSignUpLoading: true, signUpError: null};

		case types.SIGNUP_SUCCESS:
			return {...state, isSignUpLoading: false, signUpError: null};

		case types.SIGNUP_FAIL:
			return {
				...state,
				isSignUpLoading: false,
				signUpError: action.error,
			};

		default:
			return state;
	}
};

export default reducer;
