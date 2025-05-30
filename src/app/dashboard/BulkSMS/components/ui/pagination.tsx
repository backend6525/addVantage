// components/ui/pagination.tsx
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	className?: string;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	className = '',
}: PaginationProps) {
	const canGoPrev = currentPage > 1;
	const canGoNext = currentPage < totalPages;

	const getPageNumbers = () => {
		const pages = [];
		const maxVisiblePages = 5;
		let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
		let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

		if (endPage - startPage + 1 < maxVisiblePages) {
			startPage = Math.max(1, endPage - maxVisiblePages + 1);
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		return pages;
	};

	return (
		<div className={`flex items-center justify-between ${className}`}>
			<Button
				variant='ghost'
				onClick={() => onPageChange(currentPage - 1)}
				disabled={!canGoPrev}
				className='gap-1 pl-2.5'>
				<ChevronLeft className='h-4 w-4' />
				<span>Previous</span>
			</Button>

			<div className='flex items-center gap-2'>
				{getPageNumbers().map((pageNum) => (
					<Button
						key={pageNum}
						variant={currentPage === pageNum ? 'default' : 'ghost'}
						onClick={() => onPageChange(pageNum)}
						className='h-10 w-10 p-0'>
						{pageNum}
					</Button>
				))}
				{totalPages > 5 && currentPage < totalPages - 2 && (
					<span className='text-gray-400 px-2'>...</span>
				)}
				{totalPages > 5 && currentPage < totalPages - 1 && (
					<Button
						variant={currentPage === totalPages ? 'default' : 'ghost'}
						onClick={() => onPageChange(totalPages)}
						className='h-10 w-10 p-0'>
						{totalPages}
					</Button>
				)}
			</div>

			<Button
				variant='ghost'
				onClick={() => onPageChange(currentPage + 1)}
				disabled={!canGoNext}
				className='gap-1 pr-2.5'>
				<span>Next</span>
				<ChevronRight className='h-4 w-4' />
			</Button>
		</div>
	);
}
