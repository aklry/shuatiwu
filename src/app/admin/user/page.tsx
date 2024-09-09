'use client'
import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { PlusOutlined } from '@ant-design/icons'
import type { ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Avatar, Button, message, Popconfirm, Space, Typography } from 'antd'
import {
    addUserUsingPost,
    deleteUserUsingPost,
    listUserByPageUsingPost,
    updateUserUsingPost
} from '@/api/userController'
import CommonModal from '@/app/admin/components/Modal'
import UploadPicture from '@/components/upload-picture'
import { DEFAULT_PAGE_SIZE } from '@/constants'

const AdminUser: React.FC = () => {
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)
    const [dataSource, setDataSource] = useState<API.User[]>()
    // 弹窗状态
    const [visible, setVisible] = useState<boolean>(false)
    const [currentRow, setCurrentRow] = useState<API.User>()
    // 弹窗标题
    const [modalTitle, setModalTitle] = useState<string>('')
    const [imageUrl, setImageUrl] = useState<string>('')
    const fetchUserData = async (pageNumber: number, args?: API.UserQueryRequest) => {
        try {
            const requestParams: API.UserQueryRequest = args
                ? args
                : {
                      pageSize: DEFAULT_PAGE_SIZE,
                      current: pageNumber
                  }
            const res = await listUserByPageUsingPost(requestParams)
            if (res.data && res.data.records) {
                setDataSource(res.data.records)
                setTotal(res.data.total ?? 0)
            }
        } catch (e: any) {
            message.error(e.message)
        }
    }
    const handleShowModal = (user?: API.User) => {
        if (user) {
            setModalTitle('修改用户')
            setCurrentRow(user)
        } else {
            setCurrentRow(undefined)
            setModalTitle('新建用户')
        }
        setVisible(true)
    }
    const columns: ProColumns<API.User>[] = [
        {
            dataIndex: 'id',
            valueType: 'indexBorder',
            width: 48
        },
        {
            title: '账号',
            dataIndex: 'userAccount',
            ellipsis: true,
            hideInSearch: true,
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项'
                    }
                ]
            }
        },
        {
            title: '昵称',
            dataIndex: 'userName',
            ellipsis: true
        },
        {
            title: '个人简介',
            dataIndex: 'userProfile',
            ellipsis: true
        },
        {
            title: '头像',
            dataIndex: 'userAvatar',
            render: (_text, record) => <Avatar src={record.userAvatar || '/logo.png'} />,
            hideInSearch: true,
            renderFormItem: (_item, record) => {
                if (record.value) {
                    return <UploadPicture imageUrl={record.value} />
                }
                return <UploadPicture biz='user_avatar' onChange={url => setImageUrl(url)} imageUrl={imageUrl} />
            }
        },
        {
            title: '权限',
            dataIndex: 'userRole',
            hideInSearch: true,
            valueEnum: {
                user: { text: '普通用户', status: 'success' },
                admin: { text: '管理员', status: 'error' }
            },
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项'
                    }
                ]
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            valueType: 'dateTime',
            hideInSearch: true,
            hideInForm: true
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (_, record) => (
                <Space size='large'>
                    <Typography.Link onClick={() => handleShowModal(record)}>修改</Typography.Link>
                    <Popconfirm
                        title='确认删除该用户吗？'
                        description='删除后将无法恢复，请谨慎操作！'
                        onConfirm={() => handleDeleteUser(record.id)}
                        okText='确认'
                        cancelText='取消'
                    >
                        <Typography.Link type='danger'>删除</Typography.Link>
                    </Popconfirm>
                </Space>
            )
        }
    ]
    const handleDeleteUser = async (id?: number) => {
        const res = await deleteUserUsingPost({ id })
        if (res.data) {
            message.success('删除成功')
            fetchUserData(pageNumber)
        }
    }

    const handleSearchUser = async (values: API.UserQueryRequest) => {
        await fetchUserData(pageNumber, values)
    }
    const handleReset = async () => {
        await fetchUserData(pageNumber)
    }
    const handleSubmit = async (values: API.UserAddRequest | API.UserUpdateRequest) => {
        if (currentRow) {
            // 更新用户
            const res = await updateUserUsingPost({ ...values, id: currentRow.id })
            if (res.data) {
                message.success('修改成功')
                setVisible(false)
                fetchUserData(pageNumber)
            } else {
                message.error('修改失败,' + res.message)
            }
        } else {
            // 新增用户
            const res = await addUserUsingPost(values)
            if (res.data && res.data > 0) {
                message.success('新增成功')
                setVisible(false)
                fetchUserData(pageNumber)
            } else {
                message.error('新增失败,' + res.message)
            }
        }
    }
    // 初始化获取数据
    useEffect(() => {
        void fetchUserData(pageNumber)
    }, [pageNumber])
    return (
        <div className={styles['admin-user']}>
            <ProTable<API.User>
                columns={columns}
                editable={{
                    type: 'multiple'
                }}
                scroll={{ y: 400 }}
                dataSource={dataSource}
                rowKey='id'
                search={{
                    labelWidth: 'auto'
                }}
                pagination={{
                    pageSize: DEFAULT_PAGE_SIZE,
                    onChange: page => setPageNumber(page),
                    total
                }}
                dateFormatter='string'
                toolBarRender={() => [
                    <Button onClick={() => handleShowModal()} key='button' icon={<PlusOutlined />} type='primary'>
                        新建
                    </Button>
                ]}
                options={false}
                onSubmit={handleSearchUser}
                onReset={handleReset}
            />
            <CommonModal
                title={modalTitle}
                oldData={currentRow ? currentRow : undefined}
                visible={visible}
                columns={columns}
                onSubmit={handleSubmit}
                onCancel={() => setVisible(false)}
            />
        </div>
    )
}

export default AdminUser
