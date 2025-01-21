import React from 'react';

interface PerformanceCardProps {
	performance?: {
		views: number;
		clicks: number;
		ctr: number;
	};
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({ performance }) => {
	if (!performance) return null;

	return (
		<div className='bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 space-y-2'>
			<h3 className='text-lg font-semibold text-white/80 mb-2'>
				Ad Performance
			</h3>
			<div className='grid grid-cols-3 gap-2'>
				<div className='text-center'>
					<div className='text-xl font-bold text-blue-400'>
						{performance.views}
					</div>
					<div className='text-xs text-white/60'>Views</div>
				</div>
				<div className='text-center'>
					<div className='text-xl font-bold text-green-400'>
						{performance.clicks}
					</div>
					<div className='text-xs text-white/60'>Clicks</div>
				</div>
				<div className='text-center'>
					<div className='text-xl font-bold text-purple-400'>
						{performance.ctr.toFixed(2)}%
					</div>
					<div className='text-xs text-white/60'>CTR</div>
				</div>
			</div>
		</div>
	);
};

export default PerformanceCard;
