import React from 'react';
import {Menu, Container} from 'semantic-ui-react';

const Layout = props => (
	<Container>
		<Menu>
			<Menu.Item>Feed</Menu.Item>
			<Menu.Item>Logout</Menu.Item>
		</Menu>
		<div>{props.children}</div>
	</Container>
);

export default Layout;
