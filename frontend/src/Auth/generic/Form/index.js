import React from 'react';
import {Formik} from 'formik';
import {Form, Button} from 'semantic-ui-react';

import SemanticField from '../../../generic/SemanticField';

const createValidator = isSignIn => values => {
	const errors = {};

	if (!values.email) {
		errors.email = 'Email is required';
	}

	if (!values.password) {
		errors.password = 'Password is required';
	}

	if (!values.name && !isSignIn) {
		errors.name = 'Name is required';
	}

	return errors;
};

const AuthForm = props => {
	return (
		<Formik
			validateOnBlur
			validate={createValidator(props.isSignIn)}
			initialValues={{
				email: '',
				password: '',
				...(props.isSignIn ? {} : {name: ''}),
			}}
			onSubmit={props.submit}
			render={formikProps => (
				<Form onSubmit={formikProps.handleSubmit}>
					<Form.Field>
						<label>E-mail</label>

						<SemanticField
							placeholder="E-mail"
							Component={Form.Input}
							name="email"
						/>
					</Form.Field>

					{!props.isSignIn && (
						<Form.Field>
							<label>Name</label>

							<SemanticField
								placeholder="Name"
								Component={Form.Input}
								name="name"
							/>
						</Form.Field>
					)}

					<Form.Field>
						<label>Password</label>

						<SemanticField
							placeholder="Password"
							type="password"
							Component={Form.Input}
							name="password"
						/>
					</Form.Field>

					<Button
						loading={props.isLoading}
						type="submit"
						disabled={!formikProps.isValid || props.isLoading}
					>
						{props.isSignIn ? 'Sign In' : 'Sign Up'}
					</Button>
				</Form>
			)}
		/>
	);
};

export default AuthForm;
