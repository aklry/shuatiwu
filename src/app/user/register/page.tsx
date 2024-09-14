'use client'
import React from 'react'
import { LoginForm, ProForm, ProFormText } from '@ant-design/pro-components'
import { message, Tabs } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { userRegisterUsingPost } from '@/api/userController'
import { useRouter } from 'next/navigation'

const Register: React.FC = () => {
    const [form] = ProForm.useForm()
    const router = useRouter()
    const doSubmit = async (values: API.UserRegisterRequest) => {
        try {
            const res = await userRegisterUsingPost(values)
            if (res.data) {
                message.success('注册成功！')
                router.replace('/user/login')
                form.resetFields()
            } else {
                message.error('注册失败！' + res.message)
            }
        } catch (e: any) {
            message.error(e.message)
        }
    }
    return (
        <div>
            <LoginForm<API.UserRegisterRequest>
                logo='/logo.png'
                title='智汇问道'
                subTitle='一个刷题的地方'
                onFinish={doSubmit}
                form={form}
                submitter={{
                    searchConfig: {
                        submitText: '注册'
                    }
                }}
            >
                <Tabs centered>
                    <Tabs.TabPane key={'account'} tab={'注册账号'} />
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
                    <ProFormText.Password
                        name='checkPassword'
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'} />
                        }}
                        placeholder={'请确认密码'}
                        rules={[
                            {
                                required: true,
                                message: '请确认密码！'
                            }
                        ]}
                    />
                </>
            </LoginForm>
        </div>
    )
}

export default Register
