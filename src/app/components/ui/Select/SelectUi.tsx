'use client';

import React, {
	createContext,
	useContext,
	useState,
	useRef,
	useEffect,
	ReactNode,
	HTMLAttributes,
} from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have a utility for className merging

// Context for managing select state
interface SelectContextType {
	value: string;
	onValueChange: (value: string) => void;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectContext = createContext<SelectContextType | undefined>(undefined);

// Custom hook for select context
const useSelectContext = () => {
	const context = useContext(SelectContext);
	if (!context) {
		throw new Error('useSelectContext must be used within a Select component');
	}
	return context;
};

// Select component
interface SelectProps extends HTMLAttributes<HTMLDivElement> {
	value: string;
	onValueChange: (value: string) => void;
	children: ReactNode;
}

export const Select: React.FC<SelectProps> = ({
	value,
	onValueChange,
	children,
	className,
	...props
}) => {
	const [open, setOpen] = useState(false);
	const selectRef = useRef<HTMLDivElement>(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
			<div
				ref={selectRef}
				className={cn('relative w-full', className)}
				{...props}>
				{children}
			</div>
		</SelectContext.Provider>
	);
};

// Select Trigger
interface SelectTriggerProps extends HTMLAttributes<HTMLButtonElement> {}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({
	children,
	className,
	...props
}) => {
	const { open, setOpen } = useSelectContext();

	return (
		<button
			type='button'
			onClick={() => setOpen(!open)}
			className={cn(
				'flex items-center justify-between w-full px-3 py-2',
				'border border-gray-300 rounded-md shadow-sm',
				'focus:outline-none focus:ring-2 focus:ring-indigo-500',
				'bg-white text-gray-900 text-left',
				className
			)}
			{...props}>
			{children}
			<ChevronDown
				className={cn(
					'ml-2 h-5 w-5 text-gray-400 transition-transform duration-200',
					open ? 'rotate-180' : ''
				)}
			/>
		</button>
	);
};

// Select Value
interface SelectValueProps extends HTMLAttributes<HTMLSpanElement> {
	placeholder?: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({
	children,
	placeholder,
	className,
	...props
}) => {
	const { value } = useSelectContext();

	return (
		<span className={cn('text-sm', className)} {...props}>
			{value || placeholder || 'Select an option'}
		</span>
	);
};

// Select Content
interface SelectContentProps extends HTMLAttributes<HTMLDivElement> {}

export const SelectContent: React.FC<SelectContentProps> = ({
	children,
	className,
	...props
}) => {
	const { open } = useSelectContext();

	if (!open) return null;

	return (
		<div
			className={cn(
				'absolute z-10 mt-1 w-full',
				'bg-white border border-gray-300 rounded-md shadow-lg',
				'max-h-60 overflow-auto',
				className
			)}
			{...props}>
			{children}
		</div>
	);
};

// Select Item
interface SelectItemProps extends HTMLAttributes<HTMLDivElement> {
	value: string;
}

export const SelectItem: React.FC<SelectItemProps> = ({
	value,
	children,
	className,
	...props
}) => {
	const { value: selectedValue, onValueChange, setOpen } = useSelectContext();

	const handleSelect = () => {
		onValueChange(value);
		setOpen(false);
	};

	return (
		<div
			role='option'
			aria-selected={selectedValue === value}
			onClick={handleSelect}
			className={cn(
				'px-3 py-2 cursor-pointer',
				'hover:bg-gray-100',
				'flex items-center justify-between',
				selectedValue === value ? 'bg-gray-100 font-semibold' : '',
				className
			)}
			{...props}>
			<span>{children}</span>
			{selectedValue === value && <Check className='h-4 w-4 text-indigo-600' />}
		</div>
	);
};
