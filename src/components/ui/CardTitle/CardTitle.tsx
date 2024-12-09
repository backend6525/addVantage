// components/ui/card-title.js
import React from 'react';

const CardTitle = ({ children, className, ...props }) => {
	return (
		<h2
			className={`text-lg font-semibold text-gray-300 ${className}`}
			{...props}>
			{children}
		</h2>
	);
};

export default CardTitle;
