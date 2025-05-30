import React from 'react';

interface OptionCardProps {
	title: string;
	description: string;
	value: string;
	className?: string;
	onClick?: () => void;
	selected?: boolean;
}

const OptionCard: React.FC<OptionCardProps> = ({
	title,
	description,
	value,
	className = '',
	onClick,
	selected = false,
}) => {
	return (
		<div
			className={`p-8 border rounded-xl cursor-pointer transition-all duration-300 ${
				selected
					? 'border-primary bg-primary/10'
					: 'border-gray-700 hover:border-primary/50'
			} ${className}`}
			onClick={onClick}>
			<h4 className='text-xl font-bold text-white'>{title}</h4>
			<p className='text-gray-400 mt-2'>{description}</p>
		</div>
	);
};

export default OptionCard;
