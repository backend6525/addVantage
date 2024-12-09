// 'use client';

// import { useChatContext } from '@/context/ChatContext';
// import { AIFloatingIcon } from '@/app/components/AiChat/AiFloatingIcon';
// import { AIChatWindow } from '@/app/components/AiChat/AiChatWindow';

// export const GlobalChatInterface = () => {
// 	const { isChatOpen, openChat } = useChatContext();

// 	return (
// 		<>
// 			<AIFloatingIcon onClick={openChat} />
// 			{isChatOpen && <AIChatWindow />}
// 		</>
// 	);
// };

// components/GlobalChatInterface.tsx
'use client';

import { useChatContext } from '@/context/ChatContext';
import { AIFloatingIcon } from '@/app/components/AiChat/AiFloatingIcon';
import { AIChatWindow } from '@/app/components/AiChat/AiChatWindow';

export const GlobalChatInterface = () => {
	const { isChatOpen, openChat, closeChat } = useChatContext();

	return (
		<>
			<AIFloatingIcon onClick={openChat} />
			{isChatOpen && <AIChatWindow onClose={closeChat} />}
		</>
	);
};
