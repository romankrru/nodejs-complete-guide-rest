import React from 'react';
import {Menu, Container} from 'semantic-ui-react';
import {Link} from '@reach/router';

const Layout = props => (
	<Container>
		<Menu>
			<Menu.Item as={Link} to="/">
				Feed
			</Menu.Item>

			<Menu.Item as={Link} to="/auth/signup">
				Sign Up
			</Menu.Item>

			<Menu.Item as={Link} to="/auth/signin">
				Sign In
			</Menu.Item>
		</Menu>

		<div>{props.children}</div>
	</Container>
);

export default Layout;
