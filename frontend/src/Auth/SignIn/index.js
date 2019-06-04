import React, {Fragment} from 'react';
import {Header, Segment} from 'semantic-ui-react';
import Form from '../generic/Form';

const SignIn = props => {
	return (
		<Fragment>
			<Segment>
				<Header as="h3">Sign In</Header>
			</Segment>

			<Form submit={props.signIn} isLoading={props.isLoading} isSignIn />
		</Fragment>
	);
};

export default SignIn;
