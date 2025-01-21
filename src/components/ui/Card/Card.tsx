// components/ui/card.js
// import React from 'react';

// const Card = ({ children, className, ...props }) => {
// 	return (
// 		<div className={`bg-gray-800 rounded-lg shadow-md ${className}`} {...props}>
// 			{children}
// 		</div>
// 	);
// };

// export default Card;

import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className = '', ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'rounded-lg border border-gray-700 bg-gray-800/60 text-white shadow-sm',
			className
		)}
		{...props}
	/>
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className = '', ...props }, ref) => (
	<div
		ref={ref}
		className={cn('flex flex-col space-y-1.5 p-6', className)}
		{...props}
	/>
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className = '', ...props }, ref) => (
	<h3
		ref={ref}
		className={cn(
			'text-2xl font-semibold leading-none tracking-tight',
			className
		)}
		{...props}
	/>
));
CardTitle.displayName = 'CardTitle';

const CardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className = '', ...props }, ref) => (
	<div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export { Card, CardHeader, CardTitle, CardContent };
