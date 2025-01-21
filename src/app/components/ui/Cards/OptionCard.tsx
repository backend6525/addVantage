import React, { useState } from 'react';

interface OptionCardProps {
	title: string;
	description: string;
	value: string;
	className?: string;
}

const OptionCard: React.FC<OptionCardProps> = ({
	title,
	description,
	value,
}) => {
	const [selectedOption, setSelectedOption] = useState('');

	const handleOptionSelect = (option: string) => {
		setSelectedOption(option);
	};

	return (
		<div
			className={`p-8 border ${selectedOption === value ? 'border-green-500' : 'border-gray-600'} rounded mb-4 cursor-pointer`}
			onClick={() => handleOptionSelect(value)}>
			<h4 className='text-xl font-bold'>{title}</h4>
			<p className='text-gray-400'>{description}</p>
		</div>
	);
};

export default OptionCard;
