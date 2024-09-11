'use client'
import React, { memo, useEffect, useState } from 'react'
import styles from './index.module.scss'
import { Button, message, Popconfirm, Space, Typography } from 'antd'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { PlusOutlined } from '@ant-design/icons'
import CommonModal from '@/app/admin/components/Modal'
import {
    addQuestionUsingPost,
    deleteQuestionUsingPost,
    listQuestionByPageUsingPost,
    updateQuestionUsingPost
} from '@/api/questionController'
import MdEditor from '@/components/md-editor'
import TagList from '@/components/tag-list'
import { DEFAULT_PAGE_SIZE } from '@/constants'

const Question: React.FC = memo(() => {
    const [dataSource, setDataSource] = useState<API.Question[]>()
    const [total, setTotal] = useState<number>()
    const [pageNumber, setPageNumber] = useState<number>(1)
    // 弹窗状态
    const [visible, setVisible] = useState<boolean>(false)
    const [currentRow, setCurrentRow] = useState<API.Question>()
    // 弹窗标题
    const [modalTitle, setModalTitle] = useState<string>('')
    // 是否修改所属题库
    const [isChangeQuestionBank, setIsChangeQuestionBank] = useState<boolean>(false)
    const fetchQuestionData = async (pageNumber: number, args?: API.QuestionQueryRequest) => {
        try {
            const requestParams: API.QuestionQueryRequest = args
                ? args
                : {
                      pageSize: DEFAULT_PAGE_SIZE,
                      current: pageNumber
                  }
            const res = await listQuestionByPageUsingPost(requestParams)
            if (res.data && res.data.records) {
                setDataSource(res.data.records)
                setTotal(res.data.total ?? 0)
            }
        } catch (e: any) {
            message.error(e.message)
        }
    }
    const handleSearchQuestion = async (values: API.QuestionQueryRequest) => {
        await fetchQuestionData(pageNumber, values)
    }
    const handleReset = async () => {
        await fetchQuestionData(pageNumber)
    }
    const handleShowModal = (question?: API.Question, isEditBank?: boolean) => {
        if (question && isEditBank) {
            setModalTitle('修改所属题库')
            setIsChangeQuestionBank(true)
            setCurrentRow(question)
        } else if (question) {
            setModalTitle('修改用户')
            setCurrentRow(question)
            setIsChangeQuestionBank(false)
        } else {
            setCurrentRow(undefined)
            setModalTitle('新建用户')
            setIsChangeQuestionBank(false)
        }
        setVisible(true)
    }
    const handleSubmit = async (values: API.QuestionAddRequest | API.QuestionUpdateRequest) => {
        if (currentRow) {
            // 更新题目
            const res = await updateQuestionUsingPost({ ...values, id: currentRow.id })
            if (res.data) {
                message.success('修改成功')
                setVisible(false)
                fetchQuestionData(pageNumber)
            } else {
                message.error('修改失败,' + res.message)
            }
        } else {
            // 新增题目
            const res = await addQuestionUsingPost(values)
            if (res.data && res.data > 0) {
                message.success('新增成功')
                setVisible(false)
                fetchQuestionData(pageNumber)
            } else {
                message.error('新增失败,' + res.message)
            }
        }
    }
    // 删除题目
    const handleDeleteQuestion = async (id?: number) => {
        try {
            const res = await deleteQuestionUsingPost({
                id
            })
            if (res.data) {
                message.success('删除成功')
                fetchQuestionData(pageNumber)
            }
        } catch (e: any) {
            message.error(e.message)
        }
    }
    useEffect(() => {
        void fetchQuestionData(pageNumber)
    }, [pageNumber])
    const columns: ProColumns<API.Question>[] = [
        {
            title: 'id',
            dataIndex: 'id',
            valueType: 'text',
            hideInForm: true,
            width: 80
        },
        {
            title: '所属题库',
            dataIndex: 'questionBankId',
            hideInForm: true,
            hideInTable: true
        },
        {
            title: '标题',
            dataIndex: 'title',
            valueType: 'text',
            width: 240
        },
        {
            title: '内容',
            dataIndex: 'content',
            valueType: 'text',
            hideInSearch: true,
            width: 240,
            renderFormItem: (_item, records) => <MdEditor value={records.value} />
        },
        {
            title: '答案',
            dataIndex: 'answer',
            valueType: 'text',
            hideInSearch: true,
            ellipsis: true,
            width: 120,
            renderFormItem: (_item, records) => <MdEditor value={records.value} />
        },
        {
            title: '标签',
            dataIndex: 'tags',
            valueType: 'select',
            width: 180,
            fieldProps: {
                mode: 'tags'
            },
            render: (_, record) => {
                const tags = JSON.parse(record.tags as string)
                return <TagList tags={tags} />
            }
        },
        {
            title: '创建用户',
            dataIndex: 'userId',
            valueType: 'text',
            hideInForm: true,
            width: 80
        },

        {
            title: '创建时间',
            dataIndex: 'createTime',
            valueType: 'dateTime',
            hideInSearch: true,
            hideInForm: true,
            width: 120
        },
        {
            title: '编辑时间',
            dataIndex: 'editTime',
            valueType: 'dateTime',
            hideInSearch: true,
            hideInForm: true,
            width: 120
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            valueType: 'dateTime',
            hideInSearch: true,
            hideInForm: true,
            width: 120
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => (
                <Space size='middle'>
                    <Typography.Link onClick={() => handleShowModal(record, false)}>修改</Typography.Link>
                    <Typography.Link onClick={() => handleShowModal(record, true)}>修改所属题库</Typography.Link>
                    <Popconfirm
                        title='删除该题目？'
                        description='删除后将无法恢复，请谨慎操作！'
                        onConfirm={() => handleDeleteQuestion(record.id)}
                        okText='确认'
                        cancelText='取消'
                    >
                        <Typography.Link type='danger'>删除</Typography.Link>
                    </Popconfirm>
                </Space>
            ),
            width: 240
        }
    ]

    return (
        <div className={styles.question}>
            <ProTable<API.Question>
                columns={columns}
                editable={{
                    type: 'multiple'
                }}
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
                onSubmit={handleSearchQuestion}
                onReset={handleReset}
            />
            <CommonModal
                title={modalTitle}
                oldData={currentRow ? currentRow : undefined}
                visible={visible}
                columns={columns}
                onSubmit={handleSubmit}
                onCancel={() => setVisible(false)}
                isEditBank={isChangeQuestionBank}
                questionBankId={currentRow?.id}
            />
        </div>
    )
})

export default Question
