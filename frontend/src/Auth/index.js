import React, {Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid, Header, Segment, Form, Button} from 'semantic-ui-react';
import {Formik} from 'formik';

import SemanticField from '../generic/SemanticField';
import ErrorModal from '../generic/ErrorModal';

import * as actions from './actions';
export {default as reducer} from './reducer';

const validate = f => ({});

const initialFormValues = {
	email: '',
	password: '',
	name: '',
};

const Auth = props => {
	const isSignUpLoading = useSelector(state => state.auth.isSignUpLoading);
	const signUpError = useSelector(state => state.auth.signUpError);
	const dispatch = useDispatch();

	const submit = values => {
		dispatch(actions.signUp(values));
	};

	return (
		<Fragment>
			<ErrorModal error={signUpError} close={f => f} />

			<Grid centered columns={2}>
				<Grid.Column>
					<Segment>
						<Header as="h3">Sign up</Header>

						<Formik
							validateOnBlur
							validate={validate}
							initialValues={initialFormValues}
							onSubmit={submit}
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

									<Form.Field>
										<label>Name</label>

										<SemanticField
											placeholder="Name"
											Component={Form.Input}
											name="name"
										/>
									</Form.Field>

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
										loading={isSignUpLoading}
										type="submit"
									>
										Sign Up
									</Button>
								</Form>
							)}
						/>
					</Segment>
				</Grid.Column>
			</Grid>
		</Fragment>
	);
};

export default Auth;
