// 'use client';

// import * as AvatarPrimitive from '@radix-ui/react-avatar';
// import { cn } from '@/lib/utils';
// import styled from 'styled-components';

// // Responsive Container
// export const ResponsiveContainer = styled.div`
// 	@media (min-width: 768px) {
// 		flex-direction: row;
// 	}
// 	@media (max-width: 767px) {
// 		flex-direction: column;
// 	}
// `;

// // Avatar Components
// export const Avatar = ({ src, name, size = 'md', className }) => (
// 	<AvatarPrimitive.Root
// 		className={cn(
// 			'relative rounded-full',
// 			size === 'lg' ? 'h-24 w-24' : 'h-12 w-12',
// 			className
// 		)}>
// 		<AvatarPrimitive.Image
// 			src={src}
// 			alt={name}
// 			className='w-full h-full object-cover'
// 		/>
// 		<AvatarPrimitive.Fallback className='bg-gray-100 text-gray-600 flex items-center justify-center h-full w-full'>
// 			{name.slice(0, 2)}
// 		</AvatarPrimitive.Fallback>
// 	</AvatarPrimitive.Root>
// );

// // Badge Component
// export const Badge = ({ children, variant = 'default', className }) => (
// 	<span
// 		className={cn(
// 			'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
// 			variant === 'outline'
// 				? 'border border-gray-300'
// 				: 'bg-blue-100 text-blue-800',
// 			className
// 		)}>
// 		{children}
// 	</span>
// );

'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils';
import styled from 'styled-components';

// Responsive Container with Dark Theme
export const ResponsiveContainer = styled.div`
	@media (min-width: 768px) {
		flex-direction: row;
	}
	@media (max-width: 767px) {
		flex-direction: column;
	}
`;

// Avatar Component with Dark Theme and Gradient
export const Avatar = ({ src, name, size = 'md', className }) => (
	<AvatarPrimitive.Root
		className={cn(
			'relative rounded-full overflow-hidden',
			size === 'lg' ? 'h-24 w-24' : size === 'md' ? 'h-12 w-12' : 'h-8 w-8',
			className
		)}>
		<AvatarPrimitive.Image
			src={src}
			alt={name}
			className='w-20 h-20 object-cover'
		/>
		<AvatarPrimitive.Fallback className='bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center h-20 w-20 text-sm font-medium'>
			{name.slice(0, 2).toUpperCase()}
		</AvatarPrimitive.Fallback>
	</AvatarPrimitive.Root>
);

// Badge Component with Dark Theme and Gradient
export const Badge = ({ children, variant = 'default', className }) => (
	<span
		className={cn(
			'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
			variant === 'outline'
				? 'border border-gray-700 text-gray-300'
				: variant === 'success'
					? 'bg-green-500/20 text-green-400'
					: variant === 'warning'
						? 'bg-amber-500/20 text-amber-400'
						: 'bg-blue-500/20 text-blue-400',
			className
		)}>
		{children}
	</span>
);

// Glass-Morphism Card Component
export const GlassCard = styled.div`
	background: rgba(39, 39, 42, 0.5); /* bg-gray-800/50 */
	backdrop-filter: blur(10px); /* backdrop-blur-sm */
	border: 1px solid rgba(55, 65, 81, 0.5); /* border border-gray-700/50 */
	border-radius: 0.5rem; /* rounded-lg */
	box-shadow:
		0 4px 6px -1px rgba(0, 0, 0, 0.1),
		0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-lg */
`;

// Gradient Button Component
export const GradientButton = styled.button`
	background: linear-gradient(
		45deg,
		#3b82f6,
		#6366f1
	); /* bg-gradient-to-br from-blue-500 to-indigo-600 */
	color: white;
	padding: 0.5rem 1rem;
	border-radius: 0.375rem; /* rounded-md */
	font-weight: 500;
	transition: background 0.2s ease;

	&:hover {
		background: linear-gradient(
			45deg,
			#2563eb,
			#4f46e5
		); /* hover:from-blue-600 hover:to-indigo-700 */
	}
`;
