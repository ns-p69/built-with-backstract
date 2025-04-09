import EmailInput from '@/components/EmailInput'
import { useRouteGuard } from '@/utils/routeGuard';
import React from 'react'

export default function Email() {
    useRouteGuard();
    return (
        <EmailInput />
    )
}
