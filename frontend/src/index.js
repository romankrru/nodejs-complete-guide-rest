import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from '@reach/router';
import {Provider} from 'react-redux';

import Feed from './Feed';
import Post from './Post';
import Layout from './generic/Layout';
import Auth from './Auth';
import store from './store';

import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
	<Provider store={store}>
		<Layout>
			<Router>
				<Feed path="/" />
				<Post path="/:postId" />
				<Auth path="/auth/*" />
			</Router>
		</Layout>
	</Provider>,

	document.getElementById('root'),
);
