import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import React from 'react'
import { auth } from '../../../../auth';

const page = async () => {
	const session = await auth();
	return (
		<Card className='w-[350px]' >
			<CardHeader>
				<CardTitle>My Account</CardTitle>
			</CardHeader>
			<CardContent>
				<Label>
					Email Address
				</Label>
				<div className='text-muted-foreground'>
					{session?.user?.email ?? 'No currently logged in user'}
				</div>
			</CardContent>
		</Card>
	)
}

export default page;