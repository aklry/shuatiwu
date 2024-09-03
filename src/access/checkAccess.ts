import ACCESS_ENUM from '@/access/accessEnum'

const checkAccess = (loginUser: API.LoginUserVO, needAccess: string = ACCESS_ENUM.NOT_LOGIN) => {
    // 获取当前用户权限
    const userAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN
    // 表示不需要登录就能访问
    if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
        return true
    }
    // 表示需要登录才能访问
    if (needAccess === ACCESS_ENUM.USER) {
        if (userAccess === ACCESS_ENUM.NOT_LOGIN) {
            return false
        }
    }
    // 表示需要管理员才能访问
    if (needAccess === ACCESS_ENUM.ADMIN) {
        if (userAccess !== ACCESS_ENUM.ADMIN) {
            return false
        }
    }
    return true
}

export default checkAccess
