import React from 'react';
import {Item, Button} from 'semantic-ui-react';
import {navigate} from '@reach/router';

import styles from './style.module.css';

const PostItem = props => (
	<Item>
		<Item.Image
			size="tiny"
			src={`${process.env.REACT_APP_API_URL}/${props.imageUrl}`}
		/>

		<Item.Content>
			<Item.Header>{props.title}</Item.Header>

			<Item.Meta>
				<span>{props.authorName}</span>
				<span>{props.createdAt}</span>
			</Item.Meta>

			<Item.Description>
				{props.content}

				<div className={styles.controls}>
					<Button onClick={() => navigate(`/${props.id}`)}>
						View
					</Button>

					<Button
						onClick={() =>
							props.edit({
								id: props.id,
								title: props.title,
								content: props.content,
								imageUrl: props.imageUrl,
							})
						}
					>
						Edit
					</Button>
					<Button color="red">Delete</Button>
				</div>
			</Item.Description>
		</Item.Content>
	</Item>
);

export default PostItem;
