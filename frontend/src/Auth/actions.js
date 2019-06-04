export const types = {
	SET_ERROR: 'SET_ERROR',
	SIGNUP_START: 'SIGNUP_START',
	SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
	SIGNUP_FAIL: 'SIGNUP_FAIL',
	SIGNIN_START: 'SIGNIN_START',
	SIGNIN_SUCCESS: 'SIGNIN_SUCCESS',
	SIGNIN_FAIL: 'SIGNIN_FAIL',
};

export const setError = err => ({type: types.SET_ERROR, error: err});

export const signUp = data => dispatch => {
	dispatch({type: types.SIGNUP_START});

	return fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
		method: 'PUT',

		headers: {
			'Content-Type': 'application/json',
		},

		body: JSON.stringify(data),
	})
		.then(res => {
			if (res.status !== 200) {
				throw new Error('Error while signing up');
			}

			return res.json();
		})

		.then(data => {
			console.log(data);
			dispatch({type: types.SIGNUP_SUCCESS});
		})

		.catch(err => {
			console.error(err);
			dispatch({type: types.SIGNUP_FAIL, error: err});
		});
};

export const signIn = data => dispatch => {
	dispatch({type: types.SIGNIN_START});

	return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(data),
	})
		.then(res => {
			if (res.status !== 200) {
				throw new Error('Error while signin in');
			}

			return res.json();
		})

		.then(data => {
			dispatch({type: types.SIGNIN_SUCCESS, data: data});
		})

		.catch(err => {
			console.error(err);
			dispatch({type: types.SIGNIN_FAIL, error: err});
		});
};
