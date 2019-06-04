import React, {Fragment} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {Grid} from 'semantic-ui-react';
import {Router} from '@reach/router';
import {compose} from 'redux';

import ErrorModal from '../generic/ErrorModal';
import SignIn from './SignIn';
import SignUp from './SignUp';
import * as actions from './actions';
export {default as reducer} from './reducer';

const Auth = props => {
	const state = useSelector(
		state => ({
			error: state.auth.error,
			isLoading: state.auth.isSignUpLoading || state.auth.isSignInLoading,
		}),

		shallowEqual,
	);

	const dispatch = useDispatch();

	const signUp = compose(
		dispatch,
		actions.signUp,
	);

	const signIn = compose(
		dispatch,
		actions.signIn,
	);

	const closeErrorModal = () => dispatch(actions.setError(null));

	return (
		<Fragment>
			<ErrorModal error={state.error} close={closeErrorModal} />

			<Grid centered columns={2}>
				<Grid.Column>
					<Router>
						<SignIn
							path="signin"
							signIn={signIn}
							isLoading={state.isLoading}
						/>

						<SignUp
							path="signup"
							signUp={signUp}
							isLoading={state.isLoading}
						/>
					</Router>
				</Grid.Column>
			</Grid>
		</Fragment>
	);
};

export default Auth;
