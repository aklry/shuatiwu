'use client'
import React, { useEffect, useState } from 'react'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm, Space, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import {
    addQuestionBankUsingPost,
    deleteQuestionBankUsingPost,
    listQuestionBankByPageUsingPost,
    updateQuestionBankUsingPost
} from '@/api/questionBankController'
import styles from './index.module.scss'
import CommonModal from '@/app/admin/components/Modal'
import UploadPicture from '@/components/upload-picture'

const Bank: React.FC = () => {
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)
    const [dataSource, setDataSource] = useState<API.QuestionBank[]>()
    // 弹窗状态
    const [visible, setVisible] = useState<boolean>(false)
    const [currentRow, setCurrentRow] = useState<API.QuestionBank>()
    // 弹窗标题
    const [modalTitle, setModalTitle] = useState<string>('')
    const [imageUrl, setImageUrl] = useState<string>('')
    const handleDeleteQuestionBank = async (id?: number) => {
        const res = await deleteQuestionBankUsingPost({ id })
        if (res.data) {
            message.success('删除成功')
            fetchQuestionBankData(pageNumber)
        }
    }
    const handleShowModal = (questionBank?: API.QuestionBank) => {
        if (questionBank) {
            setModalTitle('修改用户')
            setCurrentRow(questionBank)
        } else {
            setCurrentRow(undefined)
            setModalTitle('新建用户')
        }
        setVisible(true)
    }
    const columns: ProColumns<API.QuestionBank>[] = [
        {
            dataIndex: 'id',
            valueType: 'indexBorder',
            hideInForm: true
        },
        {
            title: '标题',
            dataIndex: 'title',
            valueType: 'text',
            ellipsis: true
        },
        {
            title: '描述',
            dataIndex: 'description',
            valueType: 'text',
            ellipsis: true
        },
        {
            title: '图片',
            dataIndex: 'picture',
            valueType: 'image',
            fieldProps: {
                width: 64
            },
            hideInSearch: true,
            renderFormItem: (_, record) => {
                if (record.value) {
                    return <UploadPicture imageUrl={record.value} />
                }
                return <UploadPicture biz='user_avatar' onChange={url => setImageUrl(url)} imageUrl={imageUrl} />
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
            title: '编辑时间',
            dataIndex: 'editTime',
            valueType: 'dateTime',
            hideInSearch: true,
            hideInForm: true
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            valueType: 'dateTime',
            hideInSearch: true,
            hideInForm: true
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => (
                <Space size='middle'>
                    <Typography.Link onClick={() => handleShowModal(record)}>修改</Typography.Link>
                    <Popconfirm
                        title='确认删除该题库吗？'
                        description='删除后将无法恢复，请谨慎操作！'
                        onConfirm={() => handleDeleteQuestionBank(record.id)}
                        okText='确认'
                        cancelText='取消'
                    >
                        <Typography.Link type='danger'>删除</Typography.Link>
                    </Popconfirm>
                </Space>
            )
        }
    ]
    const fetchQuestionBankData = async (pageNumber: number, args?: API.QuestionBankQueryRequest) => {
        try {
            const requestParams: API.QuestionBankQueryRequest = args
                ? args
                : {
                      pageSize: 5,
                      current: pageNumber
                  }
            const res = await listQuestionBankByPageUsingPost(requestParams)
            if (res.data && res.data.records) {
                setDataSource(res.data.records)
                setTotal(res.data.total ?? 0)
            }
        } catch (e: any) {
            message.error(e.message)
        }
    }
    useEffect(() => {
        void fetchQuestionBankData(pageNumber)
    }, [pageNumber])
    const handleSubmit = async (values: API.QuestionBankAddRequest | API.QuestionBankUpdateRequest) => {
        if (currentRow) {
            // 更新题库信息
            const res = await updateQuestionBankUsingPost({ ...values, id: currentRow.id })
            if (res.data) {
                message.success('修改成功')
                setVisible(false)
                fetchQuestionBankData(pageNumber)
            } else {
                message.error('修改失败,' + res.message)
            }
        } else {
            // 新增题库信息
            const res = await addQuestionBankUsingPost(values)
            if (res.data && res.data > 0) {
                message.success('新增成功')
                setVisible(false)
                fetchQuestionBankData(pageNumber)
            } else {
                message.error('新增失败,' + res.message)
            }
        }
    }
    const handleSearchQuestionBank = async (values: API.QuestionBankQueryRequest) => {
        await fetchQuestionBankData(pageNumber, values)
    }
    const handleReset = async () => {
        await fetchQuestionBankData(pageNumber)
    }
    return (
        <div className={styles['admin-bank']}>
            <ProTable<API.Question>
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
                    pageSize: 5,
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
                onSubmit={handleSearchQuestionBank}
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

export default Bank
