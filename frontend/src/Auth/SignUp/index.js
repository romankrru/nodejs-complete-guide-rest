import React, {Fragment} from 'react';
import {Header, Segment} from 'semantic-ui-react';
import Form from '../generic/Form';

const SignIn = props => {
	return (
		<Fragment>
			<Segment>
				<Header as="h3">Sign Up</Header>
			</Segment>

			<Form submit={props.signUp} isLoading={props.isLoading} />
		</Fragment>
	);
};

export default SignIn;
