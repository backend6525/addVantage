import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'default' | 'ghost' | 'outline' | 'primary';
	size?: 'default' | 'sm' | 'lg' | 'icon';
	className?: string;
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
	variant = 'default',
	size = 'default',
	className = '',
	children,
	...props
}) => (
	<button
		role='button'
		{...props}
		className={`${className} px-4 py-2.5 font-medium text-sm text-center duration-150`}>
		{children}
	</button>
);

export default Button;
