import {combineReducers} from 'redux';
import {reducer as feedReducer} from './Feed';
import {reducer as authReducer} from './Auth';

const reducer = combineReducers({
	auth: authReducer,
	feed: feedReducer,
});

export default reducer;
