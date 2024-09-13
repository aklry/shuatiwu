import { useEffect, useState } from 'react'
import { addUserSignInUsingPost } from '@/api/userController'
import { message } from 'antd'

export const useAddUserSignInRecord = () => {
    const [loading, setLoading] = useState(false)

    const doFetch = async () => {
        setLoading(true)
        try {
            await addUserSignInUsingPost()
        } catch (e: any) {
            message.error('添加签到记录失败，' + e.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        void doFetch()
    }, [])
    return { loading }
}
