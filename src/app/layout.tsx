'use client'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import '@/assets/styles/base/reset.scss'
import BasicLayout from '@/layouts/basic-layout'

import { Provider, useDispatch } from 'react-redux'
import store from '@/store'

import React, { useCallback, useEffect } from 'react'
import { getLoginUserUsingGet } from '@/api/userController'
import { setLoginUser } from '@/store/modules/loginUser'
import { usePathname } from 'next/navigation'
import { message } from 'antd'

/**
 * 执行初始化逻辑的布局（多封装一层）
 * @param children
 * @constructor
 */
const InitLayout: React.FC<
    Readonly<{
        children: React.ReactNode
    }>
> = ({ children }) => {
    const dispatch = useDispatch()
    const pathname = usePathname()
    /**
     * 全局初始化函数，有全局单次调用的代码，都可以写到这里
     */
    const doInitLoginUser = useCallback(async () => {
        const res = await getLoginUserUsingGet()
        if (res.data) {
            dispatch(setLoginUser(res.data))
        } else {
            message.error('获取用户信息失败，请重新登录')
        }
    }, [])

    // 只执行一次
    useEffect(() => {
        if (!pathname.startsWith('/user/login') && !pathname.startsWith('/user/register')) {
            doInitLoginUser()
        }
    }, [])

    return <>{children}</>
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body>
                <AntdRegistry>
                    <Provider store={store}>
                        <InitLayout>
                            <BasicLayout>{children}</BasicLayout>
                        </InitLayout>
                    </Provider>
                </AntdRegistry>
            </body>
        </html>
    )
}
