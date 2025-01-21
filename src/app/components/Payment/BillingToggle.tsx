import { Switch } from '@/components/ui/Switch';

interface BillingToggleProps {
	billingCycle: 'monthly' | 'annual';
	onChange: (cycle: 'monthly' | 'annual') => void;
}

export const BillingToggle = ({
	billingCycle,
	onChange,
}: BillingToggleProps) => (
	<div className='flex items-center justify-end gap-4'>
		<span
			className={billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'}>
			Monthly
		</span>
		<Switch
			checked={billingCycle === 'annual'}
			onCheckedChange={(checked) => onChange(checked ? 'annual' : 'monthly')}
		/>
		<span
			className={billingCycle === 'annual' ? 'text-white' : 'text-gray-400'}>
			Annual
		</span>
	</div>
);
