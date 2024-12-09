// const Footer = () => {
// 	return (
// 		<footer className='mt-20'>
// 			<div className='custom-screen'>
// 				<div className='mt-10 py-8 border-t border-gray-800 items-center justify-between sm:flex'>
// 					<p className='text-gray-400 text-center'>
// 						© 2023 adzpay Inc. All rights reserved.
// 					</p>
// 					<div className='flex items-center justify-center gap-x-6 text-gray-500 mt-6 sm:mt-0'>
// 						<a href='/' target='_blank' aria-label='social media'>
// 							<svg
// 								className='w-6 h-6 hover:text-gray-200 duration-150'
// 								fill='none'
// 								viewBox='0 0 48 48'>
// 								<g clipPath='url(#a)'>
// 									<path
// 										fill='currentColor'
// 										d='M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24c0 11.979 8.776 21.908 20.25 23.708v-16.77h-6.094V24h6.094v-5.288c0-6.014 3.583-9.337 9.065-9.337 2.625 0 5.372.469 5.372.469v5.906h-3.026c-2.981 0-3.911 1.85-3.911 3.75V24h6.656l-1.064 6.938H27.75v16.77C39.224 45.908 48 35.978 48 24z'
// 									/>
// 								</g>
// 								<defs>
// 									<clipPath id='a'>
// 										<path fill='currentColor' d='M0 0h48v48H0z' />
// 									</clipPath>
// 								</defs>
// 							</svg>
// 						</a>
// 						<a href='/' target='_blank' aria-label='social media'>
// 							<svg
// 								className='w-6 h-6 hover:text-gray-200 duration-150'
// 								fill='none'
// 								viewBox='0 0 48 48'>
// 								<g clipPath='url(#clip0_17_80)'>
// 									<path
// 										fill='currentColor'
// 										d='M15.1 43.5c18.11 0 28.017-15.006 28.017-28.016 0-.422-.01-.853-.029-1.275A19.998 19.998 0 0048 9.11c-1.795.798-3.7 1.32-5.652 1.546a9.9 9.9 0 004.33-5.445 19.794 19.794 0 01-6.251 2.39 9.86 9.86 0 00-16.788 8.979A27.97 27.97 0 013.346 6.299 9.859 9.859 0 006.393 19.44a9.86 9.86 0 01-4.462-1.228v.122a9.844 9.844 0 007.901 9.656 9.788 9.788 0 01-4.442.169 9.867 9.867 0 009.195 6.843A19.75 19.75 0 010 39.078 27.937 27.937 0 0015.1 43.5z'
// 									/>
// 								</g>
// 								<defs>
// 									<clipPath id='clip0_17_80'>
// 										<path fill='currentColor' d='M0 0h48v48H0z' />
// 									</clipPath>
// 								</defs>
// 							</svg>
// 						</a>
// 						<a
// 							href='/https://www.linkedin.com/in/add-vantage-638916311/'
// 							target='_blank'
// 							aria-label='social media'>
// 							<svg
// 								className='w-6 h-6 hover:text-gray-200 duration-150'
// 								fill='none'
// 								viewBox='0 0 48 48'>
// 								<g clipPath='url(#clip0_17_68)'>
// 									<path
// 										fill='currentColor'
// 										d='M44.447 0H3.544C1.584 0 0 1.547 0 3.46V44.53C0 46.444 1.584 48 3.544 48h40.903C46.407 48 48 46.444 48 44.54V3.46C48 1.546 46.406 0 44.447 0zM14.24 40.903H7.116V17.991h7.125v22.912zM10.678 14.87a4.127 4.127 0 01-4.134-4.125 4.127 4.127 0 014.134-4.125 4.125 4.125 0 010 8.25zm30.225 26.034h-7.115V29.766c0-2.653-.047-6.075-3.704-6.075-3.703 0-4.265 2.896-4.265 5.887v11.325h-7.107V17.991h6.826v3.13h.093c.947-1.8 3.272-3.702 6.731-3.702 7.21 0 8.541 4.744 8.541 10.912v12.572z'
// 									/>
// 								</g>
// 								<defs>
// 									<clipPath id='clip0_17_68'>
// 										<path fill='currentColor' d='M0 0h48v48H0z' />
// 									</clipPath>
// 								</defs>
// 							</svg>
// 						</a>
// 					</div>
// 				</div>
// 			</div>
// 		</footer>
// 	);
// };

// export default Footer;

'use client';

import React from 'react';
import Link from 'next/link';
import {
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
	Github,
	Mail,
	MapPin,
	Phone,
} from 'lucide-react';

const Footer = () => {
	const footerLinks = {
		product: [
			{ label: 'Features', href: '#features' },
			{ label: 'Pricing', href: '#pricing' },
			{ label: 'Testimonials', href: '#testimonials' },
			{ label: 'FAQs', href: '#faqs' },
		],
		company: [
			{ label: 'About Us', href: '/about' },
			{ label: 'Careers', href: '/careers' },
			{ label: 'Blog', href: '/blog' },
			{ label: 'Press Kit', href: '/press' },
		],
		resources: [
			{ label: 'Documentation', href: '/docs' },
			{ label: 'Support Center', href: '/support' },
			{ label: 'Terms of Service', href: '/terms' },
			{ label: 'Privacy Policy', href: '/privacy' },
		],
		contact: [
			{ label: 'info@adzpay.net', href: 'mailto:info@adzpay.net', icon: Mail },
			{ label: '+256-762-646-175', href: 'tel:+256762646175', icon: Phone },
			{ label: 'San Francisco, CA', href: '#', icon: MapPin },
		],
	};

	const socialLinks = [
		{ icon: Facebook, href: 'https://facebook.com' },
		{ icon: Twitter, href: 'https://twitter.com' },
		{ icon: Instagram, href: 'https://instagram.com' },
		{ icon: Linkedin, href: 'https://linkedin.com' },
		{ icon: Github, href: 'https://github.com' },
	];

	return (
		<footer className='relative bg-gradient-to-b from-gray-900 to-black'>
			{/* Animated Background Elements */}
			<div className='absolute inset-0 pointer-events-none overflow-hidden'>
				<div className='absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl'></div>
				<div className='absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl'></div>
			</div>

			<div className='relative z-10 max-w-screen-xl mx-auto px-4 pt-16 pb-8'>
				{/* Main Footer Content */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16'>
					{/* Brand Section */}
					<div>
						<h2 className='text-2xl font-bold text-white mb-4'>adzpay</h2>
						<p className='text-gray-400 mb-6 leading-relaxed'>
							Revolutionizing digital advertising through social connections and
							authentic engagement.
						</p>
						{/* Social Links */}
						<div className='flex gap-4'>
							{socialLinks.map((social, idx) => {
								const Icon = social.icon;
								return (
									<a
										key={idx}
										href={social.href}
										target='_blank'
										rel='noopener noreferrer'
										className='p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:bg-purple-500/10 hover:text-purple-400 transition-all duration-300'>
										<Icon className='w-5 h-5' />
									</a>
								);
							})}
						</div>
					</div>

					{/* Quick Links */}
					{Object.entries(footerLinks).map(([title, links], idx) => (
						<div key={idx}>
							<h3 className='text-lg font-semibold text-white mb-4 capitalize'>
								{title}
							</h3>
							<ul className='space-y-3'>
								{links.map((link, linkIdx) => (
									<li key={linkIdx}>
										<Link
											href={link.href}
											className='text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2'>
											{link.icon && <link.icon className='w-4 h-4' />}
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Newsletter Section */}
				<div className='py-8 border-t border-gray-800'>
					<div className='max-w-md mx-auto text-center'>
						<h3 className='text-xl font-semibold text-white mb-4'>
							Subscribe to our newsletter
						</h3>
						<p className='text-gray-400 mb-6'>
							Stay updated with the latest features and releases.
						</p>
						<form className='flex gap-2'>
							<input
								type='email'
								placeholder='Enter your email'
								className='flex-1 px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors'
							/>
							<button
								type='submit'
								className='px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25'>
								Subscribe
							</button>
						</form>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='pt-8 mt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4'>
					<p className='text-gray-400 text-center md:text-left'>
						© {new Date().getFullYear()} adzpay Inc. All rights reserved.
					</p>
					<div className='flex items-center gap-6 text-gray-400'>
						<Link
							href='/terms'
							className='hover:text-purple-400 transition-colors'>
							Terms
						</Link>
						<Link
							href='/privacy'
							className='hover:text-purple-400 transition-colors'>
							Privacy
						</Link>
						<Link
							href='/cookies'
							className='hover:text-purple-400 transition-colors'>
							Cookies
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

Footer.displayName = 'Footer';
export default Footer;
