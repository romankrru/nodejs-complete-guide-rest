import React from 'react';
import {Button, Modal, Form} from 'semantic-ui-react';

import {Formik} from 'formik';

import SemanticField from '../../generic/SemanticField';

const validate = values => {
	const errors = {};

	if (!values.title) {
		errors.title = 'Title is required';
	}

	if (values.title && values.title.length < 5) {
		errors.title = 'Title should have min length of 5';
	}

	if (!values.content) {
		errors.content = 'Content is required';
	}

	if (values.content && values.content.length < 5) {
		errors.content = 'Content should have min length of 5';
	}

	return errors;
};

const ModalModalExample = props => (
	<Modal centered={false} open={props.isOpen}>
		<Modal.Header>Create a post</Modal.Header>
		<Modal.Content>
			<Formik
				validateOnBlur
				validate={validate}
				initialValues={{title: ''}}
				onSubmit={props.onSubmit}
				render={formikProps => (
					<Form onSubmit={formikProps.handleSubmit}>
						<Form.Field>
							<label>Title</label>

							<SemanticField
								placeholder="Post title"
								Component={Form.Input}
								name="title"
							/>
						</Form.Field>

						<Form.Field>
							<label>Content</label>

							<SemanticField
								placeholder="Post Content"
								Component={Form.TextArea}
								name="content"
							/>
						</Form.Field>

						<Button type="button" onClick={props.close}>
							Cancel
						</Button>

						<Button type="submit">Submit</Button>
					</Form>
				)}
			/>
		</Modal.Content>
	</Modal>
);

export default ModalModalExample;
