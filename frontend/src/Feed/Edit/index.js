import React, {useState, useRef, useEffect} from 'react';
import {Button, Modal, Form, Image} from 'semantic-ui-react';
import {Formik} from 'formik';

import SemanticField from '../../generic/SemanticField';
import styles from './styles.module.css';

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

	if (!values.image && !values.imageUrl) {
		errors.image = 'Image is required';
	}

	return errors;
};

const initialFormValues = {title: '', content: '', image: null};

const ModalModalExample = props => {
	const [file, setFile] = useState(null);
	const [filePreview, setFilePreview] = useState(null);
	const fileFieldRef = useRef();

	// reset image on modal close
	useEffect(() => {
		if (!props.isOpen) setFile(null);
	}, [props.isOpen]);

	// create image preview
	useEffect(() => {
		if (!file) {
			setFilePreview(null);
		} else {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = e => setFilePreview(e.target.result);
		}
	}, [file]);

	const openFilePicker = () => fileFieldRef.current.click();

	const onFileInputChange = (e, formikProps) => {
		const file = e.currentTarget.files[0];
		formikProps.setFieldValue('image', file);
		setFile(file);
	};

	const previewSrc =
		filePreview ||
		(props.data &&
			`${process.env.REACT_APP_API_URL}/${props.data.imageUrl}`);

	return (
		<Modal centered={false} open={props.isOpen}>
			<Modal.Header>
				{props.data ? 'Edit post' : 'Create a post'}
			</Modal.Header>

			<Modal.Content>
				<Formik
					validateOnBlur
					validate={validate}
					initialValues={props.data || initialFormValues}
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
								<label>Image</label>

								<Button
									color={
										formikProps.errors.image &&
										formikProps.touched.image
											? 'red'
											: undefined
									}
									onClick={openFilePicker}
									type="button"
								>
									Pick an image
								</Button>

								{file && <span>{file.name}</span>}

								<div>
									<Image
										className={styles.imageWrapper}
										src={previewSrc}
										size="small"
									/>
								</div>

								<input
									onChange={e =>
										onFileInputChange(e, formikProps)
									}
									type="file"
									ref={fileFieldRef}
									hidden
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

							<Button
								type="submit"
								disabled={
									!formikProps.isValid ||
									formikProps.isSubmitting
								}
							>
								Submit
							</Button>
						</Form>
					)}
				/>
			</Modal.Content>
		</Modal>
	);
};

export default ModalModalExample;
