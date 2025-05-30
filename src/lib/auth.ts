import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function verifyToken(token: string): Promise<boolean> {
	try {
		const { getUser } = getKindeServerSession();
		const user = await getUser();
		return !!user;
	} catch (error) {
		console.error('Error verifying token:', error);
		return false;
	}
}
