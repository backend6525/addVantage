// import React from 'react';

// export const ScrollArea = ({
// 	children,
// 	className,
// }: {
// 	children: React.ReactNode;
// 	className?: string;
// }) => {
// 	return (
// 		<div
// 			className={`overflow-auto rounded-lg ${className}`}
// 			style={{ maxHeight: '400px' }}>
// 			{children}
// 		</div>
// 	);
// };

// export default ScrollArea;

import React from 'react';

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	className?: string;
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<div
			{...props}
			className={`overflow-auto rounded-lg ${className}`}
			style={{ maxHeight: '400px' }}>
			{children}
		</div>
	);
};

export default ScrollArea;
