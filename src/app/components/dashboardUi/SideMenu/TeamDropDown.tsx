import React, { useEffect, useState } from 'react';
import { useConvex } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CircularNumberProps {
	number: number;
	online: boolean;
}

interface TEAM {
	createdBy: string;
	teamName: string;
	_id: string;
}

interface User {
	name: string;
	email: string;
	picture?: string;
	phone?: string;
	location?: string;
}

const TeamDropDown: React.FC<{ userEmail: string }> = ({ userEmail }) => {
	const [teamList, setTeamList] = useState<TEAM[] | undefined>(undefined);
	const [user, setUser] = useState<User | null>(null);
	const convex = useConvex();

	useEffect(() => {
		if (userEmail) {
			fetchUser(userEmail).then((fetchedUser) => {
				if (fetchedUser) {
					console.log('The result is: ', fetchedUser);
					setUser(fetchedUser);
					getTeamList(fetchedUser.email);
				}
			});
		}
	}, [userEmail]);

	const fetchUser = async (email: string): Promise<User | null> => {
		try {
			const result = await convex.query(api.user.getUser, { email });
			if (Array.isArray(result) && result.length > 0) {
				return result[0];
				console.log('The result is: ', result);
			}
			return null;
		} catch (error) {
			console.error('Error fetching user information:', error);
			return null;
		}
	};

	const getTeamList = async (email: string) => {
		try {
			const result = await convex.query(api.teams.getTeam, { email });
			setTeamList(result);
		} catch (error) {
			console.error('Error fetching team list:', error);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className=' flex'>
					<h2 className='pr-2'>Select Team</h2>
					{/* <CircularNumber number={2} online={true} /> */}
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				{/* <DropdownMenuLabel>Create Team </DropdownMenuLabel> */}
				{teamList?.map((team) => (
					<DropdownMenuCheckboxItem
						key={team._id}
						checked={false}
						onCheckedChange={(checked) => {
							// Handle checkbox changes here
						}}>
						{team.teamName}
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default TeamDropDown;
