import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
// 默认用户
const DEFAULT_USER: API.LoginUserVO = {
    userName: '未登录',
    userProfile: '暂无简介',
    userAvatar: '/notLoginUser.png',
    userRole: 'guest'
}

const loginUserSlice = createSlice({
    name: 'loginUser',
    initialState: {
        defaultUser: DEFAULT_USER
    },
    reducers: {
        setLoginUser: (state, action: PayloadAction<API.LoginUserVO>) => {
            state.defaultUser = action.payload
        }
    }
})

export const { setLoginUser } = loginUserSlice.actions

export default loginUserSlice.reducer
