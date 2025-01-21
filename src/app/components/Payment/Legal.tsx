'use client';

import React, { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';

const LegalComplianceModal = ({ isOpen, onClose, onAccept }) => {
	const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

	const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
		const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
		if (scrollHeight - scrollTop <= clientHeight + 1) {
			setHasScrolledToBottom(true);
		} else {
			setHasScrolledToBottom(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-2xl'>
				<DialogHeader>
					<DialogTitle>Terms of Service and Subscription Agreement</DialogTitle>
					<DialogDescription>
						Please read and accept our terms of service.
					</DialogDescription>
				</DialogHeader>

				<ScrollArea className='h-[400px] w-full pr-4' onScroll={handleScroll}>
					<div className='pr-4'>
						<h2 className='text-xl font-semibold mb-4'>Subscription Terms</h2>
						<p className='mb-4'>
							By subscribing to our service, you agree to the following terms:
						</p>

						<h3 className='font-medium mb-2'>1. Billing and Payments</h3>
						<ul className='list-disc pl-6 mb-4'>
							<li>Subscriptions are automatically renewed</li>
							<li>Cancellation can be made at any time</li>
							<li>Prorated refunds are available within 14 days</li>
						</ul>

						<h3 className='font-medium mb-2'>2. Service Usage</h3>
						<ul className='list-disc pl-6 mb-4'>
							<li>Accounts are non-transferable</li>
							<li>Prohibited uses will result in account termination</li>
							<li>Service levels are as described in the plan</li>
						</ul>

						<h3 className='font-medium mb-2'>3. Privacy and Data</h3>
						<p className='mb-4'>
							We collect and use your data as outlined in our Privacy Policy. By
							accepting, you consent to our data practices.
						</p>
					</div>
				</ScrollArea>

				<div className='mt-4 flex justify-end space-x-2'>
					<Button variant='outline' onClick={onClose}>
						Decline
					</Button>
					<Button onClick={onAccept} disabled={!hasScrolledToBottom}>
						Accept Terms
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default LegalComplianceModal;
