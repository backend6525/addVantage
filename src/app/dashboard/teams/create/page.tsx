'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { api } from '../../../../../convex/_generated/api';
import { useConvex, useMutation } from 'convex/react';
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';
import { Toaster } from '@/app/components/sonner';
import { toast } from 'sonner';

function Page() {
	const router = useRouter();
	const convex = useConvex();

	const [teamName, setTeamName] = useState('');
	const createTeam = useMutation(api.teams.createTeam);
	const { user } = useKindeBrowserClient(); // Type is inferred as 'any'

	const [bannerImage, setBannerImage] = useState('');
	const [teamMembers, setTeamMembers] = useState('');

	// Wrap `checkTeam` in useCallback to ensure stable reference across renders
	const checkTeam = useCallback(async () => {
		const result = await convex.query(api.teams.getTeam, {
			email: user?.email,
		});
		if (!result?.length) {
			router.push('/'); // Adjust the URL as needed
		}
	}, [convex, user?.email, router]);

	useEffect(() => {
		if (user) {
			checkTeam();
		}
	}, [user, checkTeam]);

	const createNewTeam = () => {
		createTeam({
			teamName: teamName,
			createdBy: user?.email,
		}).then((res) => {
			console.log(res);
			if (res) {
				router.push('/dashboard');
				toast('Team created successfully!');
			}
		});
	};

	const handleCreateTeam = () => {
		// Placeholder for additional team creation logic if needed
		console.log('Creating team:', { teamName, bannerImage, teamMembers });
	};

	return (
		<div className='px-6 md:px-16 my-16 pt-7'>
			<div className='flex flex-col items-center'>
				<h2 className='font-bold text-[40px] py-3'>
					What should we call your team?
				</h2>
				<h2 className='text-white-500 py-3 pb-3'>
					You can always change this later from settings
				</h2>
				<div className='mt-7 w-[40%]'>
					<label className='py-6'>Team Name</label>
					<Input
						placeholder='Team Name'
						className='mt-3'
						onChange={(e: any) => setTeamName(e.target.value)}
					/>
				</div>
				<Button
					className='mt-9 w-[40%] text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					disabled={!(teamName && teamName.length > 0)}
					onClick={createNewTeam}>
					Create Team
				</Button>
			</div>
			<Toaster />
		</div>
	);
}

export default Page;
