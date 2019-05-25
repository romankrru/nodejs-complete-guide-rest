import React from 'react';
import {Pagination as SemanticPagination} from 'semantic-ui-react';

const Pagination = props => (
	<SemanticPagination
		boundaryRange={1}
		siblingRange={1}
		firstItem={null}
		lastItem={null}
		activePage={props.activePage}
		totalPages={props.totalPages}
		onPageChange={(e, {activePage}) => props.setActivePage(activePage)}
	/>
);

export default Pagination;
