'use client'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import '@/assets/styles/base/reset.scss'
import BasicLayout from '@/layouts/basic-layout'

import { Provider, useDispatch } from 'react-redux'
import store, { AppDispatch } from '@/store'

import React, { memo, useCallback, useEffect } from 'react'
import { getLoginUserUsingGet } from '@/api/userController'
import { setLoginUser } from '@/store/modules/loginUser'
import { usePathname } from 'next/navigation'
import { message } from 'antd'
import AccountLayout from './account-layout'

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
    const dispatch = useDispatch<AppDispatch>()
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

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = memo(({ children }) => {
    return (
        <html lang='en'>
            <body>
                <AntdRegistry>
                    <Provider store={store}>
                        <InitLayout>
                            <BasicLayout>
                                <AccountLayout>{children}</AccountLayout>
                            </BasicLayout>
                        </InitLayout>
                    </Provider>
                </AntdRegistry>
            </body>
        </html>
    )
})
export default RootLayout
