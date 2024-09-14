'use client'
import React, { memo } from 'react'
import { ProLayout } from '@ant-design/pro-components'
import { BasicLayoutType } from '@/layouts/basic-layout/type'
import Link from 'next/link'
import Image from 'next/image'
import styles from './index.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import { LogoutOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Dropdown, Input, message } from 'antd'
import { menus as defaultMenus } from '@/menu'
import GlobalFooter from '@/components/global-footer'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { userLogoutUsingPost } from '@/api/userController'
import { setLoginUser } from '@/store/modules/loginUser'
import { DEFAULT_USER } from '@/constants'
import ACCESS_ENUM from '@/access/accessEnum'
import checkAccess from '@/access/checkAccess'

const SearchInput = () => {
    const router = useRouter()
    return (
        <div
            key='SearchOutlined'
            aria-hidden
            style={{
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: 24,
                padding: 0
            }}
            onMouseDown={e => {
                e.stopPropagation()
                e.preventDefault()
            }}
        >
            <Input.Search
                style={{
                    borderRadius: 4
                }}
                prefix={<SearchOutlined />}
                placeholder='搜索题目'
                variant='borderless'
                onSearch={value => router.push(`/questions?q=${value}`)}
            />
        </div>
    )
}

const BasicLayout: React.FC<BasicLayoutType> = memo(({ children }) => {
    const pathname = usePathname()
    const { user } = useSelector(
        (state: RootState) => ({
            user: state.loginUser.defaultUser
        }),
        shallowEqual
    )
    const dispatch = useDispatch()
    const menus = defaultMenus.filter(menu => {
        const menuAccess = menu?.access ?? ACCESS_ENUM.NOT_LOGIN
        const hideInMenu = menu?.hideInMenu ?? false
        return checkAccess(user, menuAccess) && !hideInMenu
    })
    const router = useRouter()
    // 注销用户，退出登录
    const doLogout = async (e: { key: React.Key }) => {
        if (e.key === 'logout') {
            try {
                const res = await userLogoutUsingPost()
                if (res.data) {
                    router.push('/user/login')
                    dispatch(setLoginUser(DEFAULT_USER))
                }
            } catch (e: any) {
                message.error('退出失败', e.message)
            }
        } else if (e.key === 'userCenter') {
            router.push('/user/center')
        }
    }
    return (
        <div className={styles['basic-layout']}>
            <ProLayout
                title='智汇问道'
                layout='top'
                logo={<Image src='/logo.png' width={40} height={40} alt='智汇问道' />}
                location={{ pathname }}
                menuItemRender={(item, dom) => (
                    <Link href={item.path || '/'} target={item.target}>
                        {dom}
                    </Link>
                )}
                className={styles['pro-layout']}
                avatarProps={{
                    src: user?.userAvatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    size: 'small',
                    title: user.userName || '匿名用户',
                    render: (_props, dom) => {
                        if (!user.id) {
                            return <div onClick={() => router.push('/user/login')}>{dom}</div>
                        }
                        return (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: 'userCenter',
                                            icon: <UserOutlined />,
                                            label: '个人中心'
                                        },
                                        {
                                            key: 'logout',
                                            icon: <LogoutOutlined />,
                                            label: '退出登录'
                                        }
                                    ],
                                    onClick: doLogout
                                }}
                            >
                                {dom}
                            </Dropdown>
                        )
                    }
                }}
                headerTitleRender={(logo, title) => (
                    <div>
                        <div className={styles['logo']}>{logo}</div>
                        {title}
                    </div>
                )}
                actionsRender={props => {
                    if (props.isMobile) return []
                    return [<SearchInput key='SearchInput' />]
                }}
                menuDataRender={() => menus}
                footerRender={() => <GlobalFooter />}
            >
                {children}
            </ProLayout>
        </div>
    )
})

export default BasicLayout
