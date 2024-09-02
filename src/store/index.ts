'use client'
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/counter'
import loginUserReducer from '@/store/modules/loginUser'

const store = configureStore({
    reducer: {
        counter: counterReducer,
        loginUser: loginUserReducer
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
