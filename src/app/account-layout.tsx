import React from 'react'
import { usePathname } from 'next/navigation'
import { findAllMenuItemByPath } from '@/menu'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '@/store'
import ACCESS_ENUM from '@/access/accessEnum'
import checkAccess from '@/access/checkAccess'
import Forbidden from './forbidden'

const AccountLayout: React.FC<
    Readonly<{
        children: React.ReactNode
    }>
> = ({ children }) => {
    const pathname = usePathname()
    const { user } = useSelector((state: RootState) => ({ user: state.loginUser.defaultUser }), shallowEqual)

    const menuItems = findAllMenuItemByPath(pathname)
    const needAccess = menuItems?.access ?? ACCESS_ENUM.NOT_LOGIN
    const canAccess = checkAccess(user, needAccess)
    if (!canAccess) {
        return <Forbidden />
    }
    return <>{children}</>
}

export default AccountLayout
