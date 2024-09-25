'use client'
import React, { memo, useEffect, useState } from 'react'
import { Button, Form, FormProps, Input, message, Modal } from 'antd'
import { InFoModalProps } from './type'
import UploadPicture from '@/components/upload-picture'
import { getLoginUserUsingGet, updateMyUserUsingPost } from '@/api/userController'
import { useDispatch } from 'react-redux'
import { setLoginUser } from '@/store/modules/loginUser'
import { AppDispatch } from '@/store'

const InfoModal: React.FC<InFoModalProps> = memo(({ visible, onCancel, initialValues }) => {
    const dispatch = useDispatch<AppDispatch>()
    const [imageUrl, setImageUrl] = useState<string>('')
    useEffect(() => {
        if (initialValues) {
            setImageUrl(initialValues.userAvatar ?? 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png')
        }
    }, [initialValues])
    const onFinish: FormProps<API.UserUpdateMyRequest>['onFinish'] = async values => {
        const res = await updateMyUserUsingPost(values)
        if (res.data) {
            message.success('更新成功')
            const { data } = await getLoginUserUsingGet()
            if (data) {
                dispatch(setLoginUser(data))
            }
            onCancel?.()
        } else {
            message.error('更新失败,' + res.message)
        }
    }
    return (
        <div className='user-info-modal'>
            <Modal title='个人信息' footer={null} open={visible} onCancel={onCancel}>
                <Form
                    name='basic'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete='off'
                    initialValues={initialValues}
                >
                    <Form.Item<API.UserUpdateMyRequest> label='用户名' name='userName'>
                        <Input placeholder='请输入用户名' />
                    </Form.Item>
                    <Form.Item<API.UserUpdateMyRequest> label='头像' name='userAvatar'>
                        <UploadPicture biz='user_avatar' imageUrl={imageUrl} onChange={value => setImageUrl(value)} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type='primary' htmlType='submit'>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
})

export default InfoModal
