// components/ui/card-content.js
import React from 'react';

const CardContent = ({ children, className, ...props }) => {
	return (
		<div className={`px-6 py-4 ${className}`} {...props}>
			{children}
		</div>
	);
};

export default CardContent;
