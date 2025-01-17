import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import ChangePasswordForm from './change-password-form'

const ChangePassword = async () => {
    return (
        <Card className='w-[350px]' >
            <CardHeader>
                <CardTitle>Change password</CardTitle>
            </CardHeader>
            <CardContent>
                <ChangePasswordForm />
            </CardContent>
        </Card>
    )
}

export default ChangePassword