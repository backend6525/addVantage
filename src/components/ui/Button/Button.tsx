// components/ui/button.js
import React from 'react';

interface ButtonProps {
	children: React.ReactNode;
	variant?:
		| 'primary'
		| 'secondary'
		| 'icon'
		| 'outline'
		| 'destructive'
		| 'ghost'
		| 'default';
	className?: string; // Mark className as optional
	[x: string]: any; // Allow additional props
}

const Button: React.FC<ButtonProps> = ({
	children,
	variant = 'primary',
	className = '', // Default to an empty string
	...props
}) => {
	const variantClasses = {
		primary:
			'bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-500',
		secondary:
			'bg-gray-700 text-gray-400 hover:bg-gray-600 focus:ring-gray-700',
		icon: 'text-gray-400 hover:text-gray-300 focus:ring-gray-700',
		destructive: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
		default: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-200',
	};

	return (
		<button
			className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${variantClasses[variant]} ${className}`}
			{...props}>
			{children}
		</button>
	);
};

export { Button };
