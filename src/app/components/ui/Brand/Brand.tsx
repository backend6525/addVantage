import Image from 'next/image';

const Brand = ({ ...props }) => (
	<Image
		src='/addVantage.png'
		alt='addVantage logo'
		{...props}
		width={50}
		height={20}
		priority
	/>
);
export default Brand;
