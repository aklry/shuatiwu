import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import '@/assets/styles/base/reset.scss'

import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: '刷题屋',
    description: 'Generated by create next app',
    icons: {
        icon: '/logo.ico'
    }
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <AntdRegistry>{children}</AntdRegistry>
            </body>
        </html>
    )
}
