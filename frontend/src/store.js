import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducer';

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
	middlewares.push(
		createLogger({
			collapsed: true,
		}),
	);
}

const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;
