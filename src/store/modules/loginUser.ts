import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { DEFAULT_USER } from '@/constants'

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
