import React from 'react';
import {Menu, Container} from 'semantic-ui-react';
import {Link} from '@reach/router';

const Layout = props => (
	<Container>
		<Menu>
			<Menu.Item as={Link} to="/">
				Feed
			</Menu.Item>

			<Menu.Item>Logout</Menu.Item>
		</Menu>

		<div>{props.children}</div>
	</Container>
);

export default Layout;
