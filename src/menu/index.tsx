import type { MenuDataItem } from '@ant-design/pro-components'
import { CrownOutlined } from '@ant-design/icons'
import ACCESS_ENUM from '@/access/accessEnum'

export const menus = [
    {
        path: '/',
        name: '主页'
    },
    {
        path: '/banks',
        name: '题库'
    },
    {
        path: '/questions',
        name: '题目'
    },
    {
        path: '/user/center',
        name: '个人中心',
        hideInMenu: true,
        access: ACCESS_ENUM.USER
    },
    {
        path: '/admin',
        name: '管理',
        icon: <CrownOutlined />,
        access: ACCESS_ENUM.ADMIN,
        children: [
            {
                path: '/admin/user',
                name: '用户管理',
                access: ACCESS_ENUM.ADMIN
            },
            {
                path: '/admin/bank',
                name: '题库管理',
                access: ACCESS_ENUM.ADMIN
            },
            {
                path: '/admin/question',
                name: '题目管理',
                access: ACCESS_ENUM.ADMIN
            }
        ]
    }
] as MenuDataItem[]

const findMenuItemByPath = (path: string, menuData: MenuDataItem[]): MenuDataItem | null => {
    for (const item of menuData) {
        if (item.path === path) {
            return item
        }
        if (item.children) {
            const child = findMenuItemByPath(path, item.children)
            if (child) {
                return child
            }
        }
    }
    return null
}

export const findAllMenuItemByPath = (path: string) => findMenuItemByPath(path, menus)
