'use client';

import { useState } from 'react';
import { useViewTab } from './context/ViewTabContext';
import ContactsSidebar from './components/ContactsSidebar';
import MessageComposer from './components/MessageComposer';
import TemplatesView from './components/TemplatesView';
import ContactsView from './components/ContactsView';
import ScheduledView from './components/ScheduledView';
import HistoryView from './components/HistoryView';

export default function BulkSMSPage() {
	const { viewTab } = useViewTab();
	const [contacts, setContacts] = useState<string[]>([]);
	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showContactsSidebar, setShowContactsSidebar] = useState(true);

	const handleSendMessage = async () => {
		setIsLoading(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setIsLoading(false);
		// Reset form
		setMessage('');
		setContacts([]);
	};

	const renderView = () => {
		switch (viewTab) {
			case 'compose':
				return (
					<div className='flex h-full'>
						{showContactsSidebar && (
							<ContactsSidebar
								contacts={contacts}
								setContacts={setContacts}
								showContactsSidebar={showContactsSidebar}
								setShowContactsSidebar={setShowContactsSidebar}
							/>
						)}
						<MessageComposer
							message={message}
							setMessage={setMessage}
							contacts={contacts}
							isLoading={isLoading}
							setIsLoading={setIsLoading}
							showContactsSidebar={showContactsSidebar}
							setShowContactsSidebar={setShowContactsSidebar}
						/>
					</div>
				);
			case 'templates':
				return <TemplatesView />;
			case 'contacts':
				return <ContactsView />;
			case 'schedule':
				return <ScheduledView />;
			case 'history':
				return <HistoryView />;
			default:
				return null;
		}
	};

	return <div className='h-full'>{renderView()}</div>;
}
