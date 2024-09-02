'use client'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import '@/assets/styles/base/reset.scss'
import BasicLayout from '@/layouts/basic-layout'

import { Provider } from 'react-redux'
import store from '@/store'

import React from 'react'

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body>
                <Provider store={store}>
                    <AntdRegistry>
                        <BasicLayout>{children}</BasicLayout>
                    </AntdRegistry>
                </Provider>
            </body>
        </html>
    )
}
