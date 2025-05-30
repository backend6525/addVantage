// components/SearchFilter.tsx
'use client';
import React from 'react';
import { Search } from 'lucide-react';

interface SearchFilterProps {
	filter: string;
	setFilter: (value: string) => void;
}

export const SearchFilter = ({ filter, setFilter }: SearchFilterProps) => {
	return (
		<div className='relative'>
			<input
				type='text'
				placeholder='Filter ads...'
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
				className='w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-10 focus:border-blue-500 transition-colors'
			/>
			<Search
				className='absolute left-3 top-1/2 -translate-y-1/2 text-white/50'
				size={20}
			/>
		</div>
	);
};
