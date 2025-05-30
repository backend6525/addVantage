// components/ui/modal.tsx
'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
			<div className='bg-slate-800 rounded-xl shadow-2xl border border-slate-700 w-full max-w-md'>
				<div className='flex items-center justify-between p-4 border-b border-slate-700'>
					<h3 className='text-lg font-semibold text-white'>{title}</h3>
					<button
						onClick={onClose}
						className='text-gray-400 hover:text-white p-1 rounded-full hover:bg-slate-700'>
						<X className='h-5 w-5' />
					</button>
				</div>
				<div className='p-6'>{children}</div>
			</div>
		</div>
	);
}
