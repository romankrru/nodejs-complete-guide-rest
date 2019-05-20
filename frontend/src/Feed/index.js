import React from 'react';
import {Header, Item, Dimmer, Loader} from 'semantic-ui-react';

import useFetch from '../generic/hooks/useFetch';
import Post from './Post';
import Layout from '../generic/Layout';

const Feed = props => {
	const {loading, data} = useFetch('feed/posts');

	return (
		<Layout>
			<Header as="h2" dividing>
				This is my app
			</Header>

			<Item.Group>
				{loading ? (
					<Dimmer active inverted>
						<Loader inverted>Loading</Loader>
					</Dimmer>
				) : (
					data.posts.map(post => (
						<Post
							key={post._id}
							authorName={post.creator.name}
							title={post.title}
							createdAt={post.createdAt}
						>
							{post.content}
						</Post>
					))
				)}
			</Item.Group>
		</Layout>
	);
};

export default Feed;
