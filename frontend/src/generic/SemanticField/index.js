// Wrapper to make semantic-ui fields compatible with formik library

// Example of usage:

// <SemanticField
//  placeholder="Post title"
//  Component={Form.Input}
//  name="title"
// />

import React from 'react';
import {Field} from 'formik';

const SemanticField = ({Component, ...fieldProps}) => (
	<Field
		{...fieldProps}
		render={({
			field: {value, onBlur, ...field},
			form: {setFieldValue, setFieldTouched, errors, touched},
			...props
		}) => (
			<Component
				{...fieldProps}
				{...field}
				{...props}
				{...(typeof value === 'boolean'
					? {
							checked: value,
					  }
					: {
							value,
					  })}
				error={Boolean(touched[field.name] && errors[field.name])}
				onChange={(e, {value: newValue, checked}) =>
					setFieldValue(fieldProps.name, newValue || checked || '')
				}
				onBlur={(e, blurProps) =>
					blurProps
						? setFieldTouched(fieldProps.name, blurProps.value)
						: onBlur(e)
				}
			/>
		)}
	/>
);

export default SemanticField;
