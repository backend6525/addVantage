// components/ui/input.js
import React from 'react';

const Input = ({ className, ...props }) => {
	return (
		<input
			className={`bg-gray-700 text-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
			{...props}
		/>
	);
};

export default Input;
