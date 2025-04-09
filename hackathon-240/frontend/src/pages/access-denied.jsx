import Layout from '@/components/Layout'
import React from 'react'

export default function AccessDenied() {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold">Access Denied</h1>
                <p className="text-2xl">You do not have permission to access this page.</p>
            </div>
        </Layout>
    )
}
