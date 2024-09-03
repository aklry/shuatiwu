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
        path: '/admin',
        name: '管理',
        icon: <CrownOutlined />,
        access: ACCESS_ENUM.ADMIN,
        children: [
            {
                path: '/admin/user',
                name: '用户管理',
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
