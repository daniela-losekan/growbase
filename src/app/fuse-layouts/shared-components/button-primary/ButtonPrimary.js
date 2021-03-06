import React from 'react';
import { Button } from '@material-ui/core';

export default function ButtonPrimary({ title, disabled, type, ariaLabel, fullWidth }) {
	return (
		<Button
			type={type}
			variant="contained"
			color="secondary"
			className="mx-auto mt-16 text-20 font-extrabold"
			aria-label={ariaLabel}
			fullWidth={fullWidth}
			disabled={disabled}
			value="legacy"
		>
			{title}
		</Button>
	);
}
