import SectionWrapper from '@/app/components/SectionWrapper';
import GradientWrapper from '@/app/components/GradientWrapper';

import user1 from '../../../../../public/testimonial/user1.webp';
import user2 from '../../../../../public/testimonial/user2.webp';
import user3 from '../../../../../public/testimonial/user3.webp';
import user4 from '../../../../../public/testimonial/user4.webp';
import user5 from '../../../../../public/testimonial/user5.webp';
import user6 from '../../../../../public/testimonial/user6.webp';
import Image from 'next/image';
import LayoutEffect from '@/app/components/LayoutEffect';

const Testimonial = () => {
	const testimonials = [
		{
			avatar: user1,
			name: 'Mark Zuckerberg',
			title: 'Founder of meta',
			quote:
				'adzpay completely changed how I promote brands I love!  I can now share curated fashion finds with my followers and actually earn money when they respond. It feels way more authentic than just pushing random ads',
		},
		{
			avatar: user2,
			name: 'Guillermo Rauch',
			title: 'Founder of Vercel',
			quote:
				"adzpay offers a refreshing take on marketing. It utilizes the power of word-of-mouth and social influence, leading to genuine connections between brands and consumers. It's a smart strategy for brands looking to expand their reach authentically.",
		},
		{
			avatar: user3,
			name: 'Sidi jeddou',
			title: 'Founder of Float UI',
			quote:
				"I'm constantly discovering cool new tech on adzpay. The best part? Sharing these finds with my techie friends allows me to earn a commission if they click on the ad. It's a win-win - I spread the word about interesting products, and my friends benefit from relevant recommendations.",
		},
		{
			avatar: user4,
			name: 'Ghazbel',
			title: 'Founder of forceY',
			quote:
				"adzpay has become my secret weapon for saving money!  By sharing cool ads with my friends, I earn rewards that help me with college expenses. Plus, I discover great deals and discounts that I wouldn't find anywhere else.",
		},
		{
			avatar: user5,
			name: 'Ana khan',
			title: 'Founder of larax',
			quote:
				"adzpay allows me to leverage my social media presence for targeted marketing. I only promote brands I use and believe in, and adzpay helps me earn rewards for doing so. It's a fantastic way to monetize my influence while connecting my audience with products they might love",
		},
		{
			avatar: user6,
			name: 'Ahmed khasem',
			title: 'Founder of Let’s code',
			quote:
				"adzpay is a great way to make some extra income while staying home with the kids. I discover awesome products for families, share them with my network, and earn commissions. It's flexible and allows me to contribute financially without leaving the house",
		},
	];

	return (
		<SectionWrapper>
			<div id='testimonials' className='custom-screen text-gray-300'>
				<div className='max-w-2xl text-center md:mx-auto'>
					<h2 className='text-gray-50 text-3xl font-semibold sm:text-4xl'>
						adzpay opennig the door
					</h2>
				</div>
				<GradientWrapper
					wrapperclassname='max-w-sm h-40 top-12 inset-x-0'
					className='mt-12'>
					<LayoutEffect
						className='duration-1000 delay-300'
						isInviewState={{
							trueState: 'opacity-1',
							falseState: 'opacity-0 translate-y-12',
						}}>
						<ul className='grid gap-6 duration-1000 delay-300 ease-in-out sm:grid-cols-2 lg:grid-cols-3'>
							{testimonials.map((item, idx) => (
								<li
									key={idx}
									className='p-4 rounded-xl border border-gray-800'
									style={{
										backgroundImage:
											'radial-gradient(100% 100% at 50% 50%, rgba(124, 58, 237, 0.05) 0%, rgba(124, 58, 237, 0) 100%)',
									}}>
									<figure className='flex flex-col justify-between gap-y-6 h-full'>
										<blockquote className=''>
											<p className=''>{item.quote}</p>
										</blockquote>
										<div className='flex items-center gap-x-4'>
											<Image
												src={item.avatar}
												alt={item.name}
												className='w-14 h-14 rounded-full object-cover'
											/>
											<div>
												<span className='block text-gray-50 font-semibold'>
													{item.name}
												</span>
												<span className='block text-sm mt-0.5'>
													{item.title}
												</span>
											</div>
										</div>
									</figure>
								</li>
							))}
						</ul>
					</LayoutEffect>
				</GradientWrapper>
			</div>
		</SectionWrapper>
	);
};

export default Testimonial;
