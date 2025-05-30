'use client';

import { createContext, useContext } from 'react';

// Define the context type
export type ViewTabContextType = {
	viewTab: 'compose' | 'templates' | 'history' | 'contacts' | 'schedule';
	setViewTab: (
		tab: 'compose' | 'templates' | 'history' | 'contacts' | 'schedule'
	) => void;
};

// Create the context
export const ViewTabContext = createContext<ViewTabContextType | undefined>(
	undefined
);

// Create a hook to use the context
export const useViewTab = () => {
	const context = useContext(ViewTabContext);
	if (context === undefined) {
		throw new Error('useViewTab must be used within a ViewTabProvider');
	}
	return context;
};
