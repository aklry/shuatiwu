'use client'
import React, { memo } from 'react'
import { ProLayout } from '@ant-design/pro-components'
import { BasicLayoutType } from '@/layouts/basic-layout/type'
import Link from 'next/link'
import Image from 'next/image'
import styles from './index.module.scss'
import { usePathname } from 'next/navigation'
import { LogoutOutlined, SearchOutlined } from '@ant-design/icons'
import { Dropdown, Input } from 'antd'
import menuData from '@/menu'
import GlobalFooter from '@/components/global-footer'

const SearchInput = () => {
    return (
        <div
            key='SearchOutlined'
            aria-hidden
            style={{
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: 24
            }}
            onMouseDown={e => {
                e.stopPropagation()
                e.preventDefault()
            }}
        >
            <Input
                style={{
                    borderRadius: 4,
                    marginInlineEnd: 12
                }}
                prefix={<SearchOutlined />}
                placeholder='搜索题目'
                variant='borderless'
            />
        </div>
    )
}

const BasicLayout: React.FC<BasicLayoutType> = memo(({ children }) => {
    const pathname = usePathname()
    return (
        <div className={styles['basic-layout']}>
            <ProLayout
                title='刷题屋'
                layout='top'
                logo={<Image src='/logo.png' width={40} height={40} alt='刷题屋' />}
                location={{ pathname }}
                menuItemRender={(item, dom) => (
                    <Link href={item.path || '/'} target={item.target}>
                        {dom}
                    </Link>
                )}
                className={styles['pro-layout']}
                avatarProps={{
                    src: 'http://aklry.oss-cn-guangzhou.aliyuncs.com/2024/me.jpg',
                    size: 'small',
                    title: 'aklry',
                    render: (_props, dom) => {
                        return (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: 'logout',
                                            icon: <LogoutOutlined />,
                                            label: '退出登录'
                                        }
                                    ]
                                }}
                            >
                                {dom}
                            </Dropdown>
                        )
                    }
                }}
                headerTitleRender={(logo, title, _) => {
                    const defaultDom = (
                        <a>
                            {logo}
                            {title}
                        </a>
                    )
                    if (typeof window === 'undefined') return defaultDom
                    if (document.body.clientWidth < 1400) {
                        return defaultDom
                    }
                    if (_.isMobile) return defaultDom
                    return <>{defaultDom}</>
                }}
                actionsRender={props => {
                    if (props.isMobile) return []
                    return [<SearchInput key='SearchInput' />]
                }}
                menuDataRender={() => menuData}
                footerRender={() => <GlobalFooter />}
            >
                {children}
            </ProLayout>
        </div>
    )
})

export default BasicLayout
