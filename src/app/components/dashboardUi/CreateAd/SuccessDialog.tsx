// // SuccessDialog.tsx
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogDescription,
// 	DialogTitle,
// } from '@/app/components/ui/DialogPopup/dialog';
// import { motion } from 'framer-motion';
// import { FiAlertCircle } from 'react-icons/fi';

// export const SuccessDialog = ({
// 	setShowSuccessDialog,
// }: {
// 	setShowSuccessDialog: (show: boolean) => void;
// }) => (
// 	<Dialog open={true}>
// 		<DialogContent className='bg-gradient-to-br from-green-600 to-green-800 text-white rounded-2xl max-w-md p-8'>
// 			<motion.div
// 				initial={{ opacity: 0, scale: 0.9 }}
// 				animate={{ opacity: 1, scale: 1 }}
// 				transition={{ duration: 0.3 }}>
// 				<div className='text-center'>
// 					<FiAlertCircle size={64} className='mx-auto mb-4 text-white' />
// 					<DialogTitle className='text-2xl font-bold mb-2'>
// 						Ad Created Successfully!
// 					</DialogTitle>
// 					<DialogDescription className='text-white/80'>
// 						Your ad has been created and is ready to go.
// 					</DialogDescription>
// 					<div className='mt-6'>
// 						<button
// 							onClick={() => setShowSuccessDialog(false)}
// 							className='bg-white text-green-700 px-6 py-2 rounded-lg hover:bg-gray-100'>
// 							Close
// 						</button>
// 					</div>
// 				</div>
// 			</motion.div>
// 		</DialogContent>
// 	</Dialog>
// );

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/app/components/ui/DialogPopup/dialog';
import { motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';

interface SuccessDialogProps {
	onClose: () => void;
	className?: string;
}

export const SuccessDialog = ({
	onClose,
	className = '',
}: SuccessDialogProps) => (
	<Dialog open={true} onOpenChange={onClose}>
		<DialogContent className={`${className} rounded-2xl max-w-md p-8`}>
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.3 }}>
				<div className='text-center'>
					<FiAlertCircle size={64} className='mx-auto mb-4 text-white' />
					<DialogTitle className='text-2xl font-bold mb-2'>
						Ad Created Successfully!
					</DialogTitle>
					<DialogDescription className='text-white/80'>
						Your ad has been created and is ready to go.
					</DialogDescription>
					<div className='mt-6'>
						<button
							onClick={onClose}
							className='bg-white text-green-700 px-6 py-2 rounded-lg hover:bg-gray-100'>
							Close
						</button>
					</div>
				</div>
			</motion.div>
		</DialogContent>
	</Dialog>
);
