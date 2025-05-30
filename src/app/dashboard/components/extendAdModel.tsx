// components/ExtendAdModal.tsx
'use client';
import React, { useState } from 'react';
import { Product } from '@/app/dashboard/types/dashboard_types';

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/app/components/ui/DialogPopup/dialog';
// Import Dialog components and icons

import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/Button/Button';

import Input from '@/app/components/ui/Input/Input';

interface ExtendAdModalProps {
	ad: Product;
	onClose: () => void;
	onExtend: (adId: string, extensionDays: number) => Promise<void>;
	isMobile?: boolean;
}

export const ExtendAdModal = ({
	ad,
	onClose,
	onExtend,
}: ExtendAdModalProps) => {
	// ... existing ExtendAdModal logic ...
	const [extensionDays, setExtensionDays] = useState(30);

	const handleExtend = () => {
		onExtend(ad.id, extensionDays);
		onClose();
	};
	return (
		<Dialog open={true} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Ad Expiring Soon</DialogTitle>
					<DialogDescription>
						Your ad for {ad.title} will expire in {ad.daysRemaining} days
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='extension' className='text-right'>
							Extend by days:
						</Label>
						<Input
							id='extension'
							type='number'
							value={extensionDays}
							onChange={(e) => setExtensionDays(Number(e.target.value))}
							min={1}
							className='col-span-3'
						/>
					</div>
				</div>
				<DialogFooter>
					<Button variant='default' onClick={handleExtend}>
						Extend Ad
					</Button>
					<Button variant='destructive'>Deactivate Ad</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
