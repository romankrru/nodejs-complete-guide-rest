export const types = {
	SIGNUP_START: 'SIGNUP_START',
	SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
	SIGNUP_FAIL: 'SIGNUP_FAIL',
};

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
