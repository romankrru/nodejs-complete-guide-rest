import {useReducer, useEffect} from 'react';

const API_URL = process.env.REACT_APP_API_URL;

const actionTypes = {
	LOADING_SUCCESS: 'LOADING_SUCCESS',
	LOADING_ERROR: 'LOADING_ERROR',
};

const initialState = {
	data: undefined,
	loading: true,
	error: undefined,
};

const reducer = (state, action) => {
	switch (action.type) {
		case actionTypes.LOADING_SUCCESS:
			return {
				...state,
				loading: false,
				error: undefined,
				data: action.data,
			};

		case actionTypes.LOADING_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
				data: undefined,
			};

		default:
			return state;
	}
};

const useFetch = url => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const controller = new AbortController();

		fetch(`${API_URL}/${url}`, {controller: controller})
			.then(res => {
				if (!res.ok) throw new Error('Some error occurred!');
				return res.json();
			})

			.then(data =>
				dispatch({type: actionTypes.LOADING_SUCCESS, data: data}),
			)

			.catch(err => {
				console.error(err);

				dispatch({
					type: actionTypes.LOADING_ERROR,
					error: err,
				});
			});

		return () => controller.abort();
	}, [url]);

	return state;
};

export default useFetch;
