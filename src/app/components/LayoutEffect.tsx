'use client';
import React, { cloneElement, useRef } from 'react';
import { useInView } from 'framer-motion';

interface LayoutEffectProps {
	children: React.ReactNode;
	className?: string;
	isInviewState: {
		trueState?: string;
		falseState?: string;
	};
}

const LayoutEffect: React.FC<LayoutEffectProps> = ({
	children,
	className,
	isInviewState: { trueState = '', falseState = '' },
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true });

	// If children is a single element, clone it with proper typing
	if (React.isValidElement(children)) {
		return cloneElement<any>(children, {
			ref,
			className: `${(children.props as any).className || ''} ${className || ''} ${
				isInView ? trueState : falseState
			}`,
		});
	}

	// If multiple children, wrap them in a div
	return (
		<div
			ref={ref}
			className={`${className || ''} ${isInView ? trueState : falseState}`}>
			{children}
		</div>
	);
};

export default LayoutEffect;
