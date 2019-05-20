import React, {useState, Fragment} from 'react';
import {Button, Modal, Form} from 'semantic-ui-react';

const ModalModalExample = props => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState({title: '', content: ''});

	const handleChange = (_e, {name, value}) =>
		setFormState({
			...formState,
			[name]: value,
		});

	return (
		<Fragment>
			<Button onClick={() => setIsOpen(true)}>New Post</Button>

			<Modal centered={false} open={isOpen}>
				<Modal.Header>Create a post</Modal.Header>
				<Modal.Content>
					<Form onSubmit={() => props.onSubmit(formState)}>
						<Form.Field>
							<label>Title</label>

							<Form.Input
								placeholder="Title"
								name="title"
								onChange={handleChange}
								value={formState.title}
							/>
						</Form.Field>

						<Form.TextArea
							label="Content"
							placeholder="Post content"
							name="content"
							onChange={handleChange}
							value={formState.content}
						/>

						<Button type="button" onClick={() => setIsOpen(false)}>
							Cancel
						</Button>

						<Button type="submit">Submit</Button>
					</Form>
				</Modal.Content>
			</Modal>
		</Fragment>
	);
};

export default ModalModalExample;
