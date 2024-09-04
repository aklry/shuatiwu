'use client'
import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { PlusOutlined } from '@ant-design/icons'
import type { ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Avatar, Button, message, Popconfirm, Space, Typography } from 'antd'
import { deleteUserUsingPost, listUserVoByPageUsingPost } from '@/api/userController'

const AdminUser: React.FC = () => {
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)
    const [dataSource, setDataSource] = useState<API.UserVO[]>()
    const fetchUserData = async (pageNumber: number, args?: API.UserQueryRequest) => {
        try {
            const requestParams: API.UserQueryRequest = args
                ? args
                : {
                      pageSize: 5,
                      current: pageNumber
                  }
            const res = await listUserVoByPageUsingPost(requestParams)
            if (res.data && res.data.records) {
                setDataSource(res.data.records)
                setTotal(res.data.total ?? 0)
            }
        } catch (e: any) {
            message.error(e.message)
        }
    }
    const columns: ProColumns<API.UserVO>[] = [
        {
            dataIndex: 'id',
            valueType: 'indexBorder',
            width: 48
        },
        {
            title: '昵称',
            dataIndex: 'userName',
            ellipsis: true,
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
            title: '个人简介',
            dataIndex: 'userProfile',
            ellipsis: true
        },
        {
            title: '头像',
            dataIndex: 'userAvatar',
            render: (_text, record) => <Avatar src={record.userAvatar || '/logo.png'} />,
            hideInSearch: true
        },
        {
            title: '权限',
            dataIndex: 'userRole',
            hideInSearch: true,
            valueEnum: {
                user: { text: '普通用户', status: 'success' },
                admin: { text: '管理员', status: 'error' }
            }
        },
        {
            title: '创建时间',
            key: 'showTime',
            dataIndex: 'createTime',
            valueType: 'date',
            hideInSearch: true
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (_, record) => (
                <Space size='middle'>
                    <Typography.Link>修改</Typography.Link>
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
    // 初始化获取数据
    useEffect(() => {
        void fetchUserData(pageNumber)
    }, [pageNumber])
    return (
        <ProTable<API.UserVO>
            columns={columns}
            editable={{
                type: 'multiple'
            }}
            className={styles['admin-user']}
            scroll={{ y: 400 }}
            dataSource={dataSource}
            rowKey='id'
            search={{
                labelWidth: 'auto'
            }}
            pagination={{
                pageSize: 5,
                onChange: page => setPageNumber(page),
                total
            }}
            dateFormatter='string'
            toolBarRender={() => [
                <Button key='button' icon={<PlusOutlined />} type='primary'>
                    新建
                </Button>
            ]}
            options={false}
            onSubmit={handleSearchUser}
            onReset={handleReset}
        />
    )
}

export default AdminUser
