import React from 'react';
import {Item, Dimmer, Loader} from 'semantic-ui-react';

import useFetch from '../generic/hooks/useFetch';
import Post from './Post';
import Edit from './Edit';
import Layout from '../generic/Layout';

const Feed = props => {
	const {loading, data} = useFetch('feed/posts');

	const submit = postData => {
		fetch(`${process.env.REACT_APP_API_URL}/feed/post`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(postData),
		})
			.then(r => r.json())
			.then(d => console.log(d))
			.catch(err => console.error(err));
	};

	return (
		<Layout>
			<Edit onSubmit={submit} />

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
