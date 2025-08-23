'use client';

import React from 'react';
import Link from 'next/link';
import Brand from '../Brand';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
	const footerLinks = [
		{
			title: 'Product',
			links: [
				{ name: 'Features', href: '/#features' },
				{ name: 'Pricing', href: '/#pricing' },
				{ name: 'Testimonials', href: '/#testimonials' },
				{ name: 'FAQ', href: '/#faq' },
			],
		},
		{
			title: 'Company',
			links: [
				{ name: 'About', href: '/about' },
				{ name: 'Careers', href: '/careers' },
				{ name: 'Blog', href: '/blog' },
				{ name: 'Press', href: '/press' },
			],
		},
		{
			title: 'Resources',
			links: [
				{ name: 'Documentation', href: '/docs' },
				{ name: 'Support', href: '/support' },
				{ name: 'Terms of Service', href: '/terms' },
				{ name: 'Privacy Policy', href: '/privacy' },
			],
		},
		{
			title: 'Connect',
			links: [
				{ name: 'Twitter', href: 'https://x.com/adzpay_ug' },
				{ name: 'LinkedIn', href: 'https://linkedin.com' },
				{ name: 'Facebook', href: 'https://facebook.com' },
				{ name: 'Instagram', href: 'https://instagram.com' },
			],
		},
	];

	const socialLinks = [
		{ icon: Facebook, href: 'https://facebook.com' },
		{ icon: Twitter, href: 'https://x.com/adzpay_ug' },
		{ icon: Instagram, href: 'https://instagram.com' },
		{ icon: Linkedin, href: 'https://linkedin.com' },
		{ icon: Github, href: 'https://github.com' },
	];

	return (
		<footer className='relative border-t border-border'>
			{/* Gradient overlay */}
			<div className='absolute inset-0 pointer-events-none'>
				<div className='absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background'></div>
				<div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent'></div>
			</div>

			<div className='relative z-10 max-w-screen-xl mx-auto px-4 py-16'>
				<div className='grid gap-8 sm:gap-16 grid-cols-2 md:grid-cols-4 lg:grid-cols-5'>
					{/* Brand Column */}
					<div className='col-span-2 md:col-span-4 lg:col-span-1'>
						<Link href='/' className='flex items-center space-x-2 mb-8'>
							<Brand className='h-8 w-8' />
							<span className='text-2xl font-bold text-foreground'>AdZPay</span>
						</Link>
						<p className='text-muted-foreground leading-relaxed mb-8'>
							Revolutionizing digital marketing through authentic connections
							and smart recommendations.
						</p>
						<div className='flex items-center gap-4'>
							{socialLinks.map((item, idx) => {
								const Icon = item.icon;
								return (
									<Link
										key={idx}
										href={item.href}
										className='p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors'
										target='_blank'
										rel='noopener noreferrer'>
										<Icon className='w-5 h-5' />
									</Link>
								);
							})}
						</div>
					</div>

					{/* Links Columns */}
					{footerLinks.map((col, idx) => (
						<div key={idx}>
							<h3 className='font-semibold text-foreground mb-4'>
								{col.title}
							</h3>
							<ul className='space-y-3'>
								{col.links.map((link, linkIdx) => (
									<li key={linkIdx}>
										<Link
											href={link.href}
											className='text-muted-foreground hover:text-primary transition-colors'>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom Bar */}
				<div className='mt-16 pt-8 border-t border-border'>
					<div className='flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-sm'>
						<p>© 2024 AdZPay. All rights reserved.</p>
						<div className='flex items-center gap-4'>
							<Link
								href='/terms'
								className='hover:text-primary transition-colors'>
								Terms
							</Link>
							<Link
								href='/privacy'
								className='hover:text-primary transition-colors'>
								Privacy
							</Link>
							<Link
								href='/cookies'
								className='hover:text-primary transition-colors'>
								Cookies
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

Footer.displayName = 'Footer';
export default Footer;
