import React from 'react';
import {Item, Button} from 'semantic-ui-react';

import styles from './style.module.css';

const Post = props => (
	<Item>
		<Item.Image size="tiny" src={props.imageUrl} />

		<Item.Content>
			<Item.Header>{props.title}</Item.Header>
			<Item.Meta>
				<span>{props.authorName}</span>
				<span>{props.createdAt}</span>
			</Item.Meta>
			<Item.Description>
				{props.children}
				<div className={styles.controls}>
					<Button>View</Button>
					<Button>Edit</Button>
					<Button color="red">Delete</Button>
				</div>
			</Item.Description>
		</Item.Content>
	</Item>
);

export default Post;
