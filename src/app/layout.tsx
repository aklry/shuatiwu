import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import '@/assets/styles/base/reset.scss'

import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: '刷题屋',
    description: '刷题，提升编程能力, 学习编程知识, 面试技巧',
    keywords: '刷题, 编程, 面试, 算法, 学习',
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
