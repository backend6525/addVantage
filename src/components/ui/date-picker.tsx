'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerProps {
	selected?: Date;
	onSelect?: (date: Date | undefined) => void;
	className?: string;
	placeholder?: string;
	disabled?: boolean;
	fromDate?: Date;
}

export function DatePicker({
	selected,
	onSelect,
	className,
	placeholder = 'Pick a date',
	disabled = false,
}: DatePickerProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'justify-start text-left font-normal',
						!selected && 'text-muted-foreground',
						className
					)}
					disabled={disabled}>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{selected ? format(selected, 'PPP') : <span>{placeholder}</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<DayPicker
					mode='single'
					selected={selected}
					onSelect={onSelect}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
