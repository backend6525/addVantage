import * as React from 'react';
import { cn } from '@/lib/utils';
import { Control, FieldValues, Controller, Path } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	render: ({ field }: { field: any }) => React.ReactNode;
	className?: string;
}

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
	children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ children, className, ...props }) => (
	<form className={cn('space-y-6', className)} {...props}>
		{children}
	</form>
);

const FormControl: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
	children,
	className,
	...props
}) => (
	<div className={cn('mb-4', className)} {...props}>
		{children}
	</div>
);

// const FormField: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
// 	children,
// 	className,
// 	...props
// }) => (
// 	<div className={cn('flex flex-col', className)} {...props}>
// 		{children}
// 	</div>
// );
const FormField = <T extends FieldValues>({
	control,
	name,
	render,
	className,
	...props
}: FormFieldProps<T>) => (
	<Controller
		control={control}
		name={name}
		render={({ field }) => (
			<div className={cn('flex flex-col', className)} {...props}>
				{render({ field })}
			</div>
		)}
	/>
);
const FormItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
	children,
	className,
	...props
}) => (
	<div className={cn('flex items-center', className)} {...props}>
		{children}
	</div>
);

const FormLabel: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
	children,
	className,
	...props
}) => (
	<label
		className={cn('block text-sm font-medium text-gray-300', className)}
		{...props}>
		{children}
	</label>
);

const FormMessage: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
	children,
	className,
	...props
}) => (
	<div className={cn('text-sm text-red-500', className)} {...props}>
		{children}
	</div>
);

export { Form, FormControl, FormField, FormItem, FormLabel, FormMessage };
