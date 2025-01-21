'use client';

import * as React from 'react';

export interface LabelProps {
	children: React.ReactNode;
	htmlFor?: string;
	className?: string;
}

const Label: React.FC<LabelProps> = ({ children, htmlFor, className = '' }) => {
	return (
		<label
			htmlFor={htmlFor}
			className={`text-sm font-medium text-gray-200 ${className}`}>
			{children}
		</label>
	);
};

export default Label;
