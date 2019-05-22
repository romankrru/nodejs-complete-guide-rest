import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from '@reach/router';

import Feed from './Feed';
import Post from './Post';
import Layout from './generic/Layout';

import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
	<Layout>
		<Router>
			<Feed path="/" />
			<Post path="/:postId" />
		</Router>
	</Layout>,

	document.getElementById('root'),
);
