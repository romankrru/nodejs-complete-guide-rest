import React from 'react';
import {Modal, Button, Divider} from 'semantic-ui-react';

const ErrorModal = props =>
	props.error ? (
		<Modal centered={false} open={Boolean(props.error)}>
			<Modal.Header>Error!</Modal.Header>
			<Modal.Content>
				<div>{props.error.message}</div>
				<Divider />
				<Button onClick={props.close}>Close</Button>
			</Modal.Content>
		</Modal>
	) : null;

export default ErrorModal;
