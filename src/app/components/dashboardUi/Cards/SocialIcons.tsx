import Image from "next/image";

const SocialIcon1 = ({ ...props }) => (
	<Image
		src="/linkedin.png"
		alt="linkedin logo"
		{...props}
		width={60}
		height={30}
		priority
	/>
);

const SocialIcon2 = ({ ...props }) => (
	<Image
		src="/instagram.png"
		alt="instagram logo"
		{...props}
		width={60}
		height={30}
		priority
	/>
);
const SocialIcon3 = ({ ...props }) => (
	<Image
		src="/tik-tok.png"
		alt="tik-tok logo"
		{...props}
		width={60}
		height={30}
		priority
	/>
);
const SocialIcon4 = ({ ...props }) => (
	<Image
		src="/twitter.png"
		alt="twitter logo"
		{...props}
		width={60}
		height={30}
		priority
	/>
);
const SocialIcon5 = ({ ...props }) => (
	<Image
		src="/whatsapp.png"
		alt="whatsapp logo"
		{...props}
		width={60}
		height={30}
		priority
	/>
);
export { SocialIcon1, SocialIcon2, SocialIcon3, SocialIcon4, SocialIcon5 };
