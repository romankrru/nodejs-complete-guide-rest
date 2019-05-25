import {combineReducers} from 'redux';
import {reducer as feedReducer} from './Feed';

const reducer = combineReducers({
	feed: feedReducer,
});

export default reducer;
