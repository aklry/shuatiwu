'use client'
import React, { memo } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { LoginForm, ProFormText, ProForm } from '@ant-design/pro-components'
import { message, Tabs } from 'antd'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { userLoginUsingPost } from '@/api/userController'
import { setLoginUser } from '@/store/modules/loginUser'
import { useRouter } from 'next/navigation'

const Login: React.FC = memo(() => {
    const [form] = ProForm.useForm()
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const doSubmit = async (values: API.UserAddRequest) => {
        try {
            const res = await userLoginUsingPost(values)
            if (res.data) {
                message.success('登录成功！')
                dispatch(setLoginUser(res.data))
                router.replace('/')
                form.resetFields()
            }
        } catch (e: any) {
            message.error('登录失败！', e.message)
        }
    }
    return (
        <div>
            <LoginForm<API.UserAddRequest>
                logo='/logo.png'
                title='智汇问道'
                subTitle='一个刷题的地方'
                form={form}
                onFinish={doSubmit}
            >
                <Tabs centered>
                    <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
                </Tabs>
                <>
                    <ProFormText
                        name='userAccount'
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined className={'prefixIcon'} />
                        }}
                        placeholder={'请输入账号'}
                        rules={[
                            {
                                required: true,
                                message: '请输入账号!'
                            }
                        ]}
                    />
                    <ProFormText.Password
                        name='userPassword'
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'} />
                        }}
                        placeholder={'请输入密码'}
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！'
                            }
                        ]}
                    />
                </>
                <div
                    style={{
                        marginBlockEnd: 24
                    }}
                >
                    <a
                        href='/user/register'
                        style={{
                            float: 'right',
                            marginTop: '10px',
                            marginBottom: '10px'
                        }}
                    >
                        暂无帐号？立即注册
                    </a>
                </div>
            </LoginForm>
        </div>
    )
})

export default Login
