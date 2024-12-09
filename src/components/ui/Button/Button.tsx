// components/ui/button.js
import React from 'react';

const Button = ({ children, variant = 'primary', className, ...props }) => {
	const variantClasses = {
		primary:
			'bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-500',
		secondary:
			'bg-gray-700 text-gray-400 hover:bg-gray-600 focus:ring-gray-700',
		icon: 'text-gray-400 hover:text-gray-300 focus:ring-gray-700',
	};

	return (
		<button
			className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${variantClasses[variant]} ${className}`}
			{...props}>
			{children}
		</button>
	);
};

export default Button;
