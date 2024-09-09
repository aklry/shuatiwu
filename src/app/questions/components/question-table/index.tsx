'use client'
import React, { useState } from 'react'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { listQuestionVoByPageUsingPost } from '@/api/questionController'
import { DEFAULT_PAGE_SIZE } from '@/constants'
import Link from 'next/link'
import TagList from '@/components/tag-list'
import { IQuestionTableProps } from './type'
import type { TablePaginationConfig } from 'antd'
import styles from './index.module.scss'

const QuestionTable: React.FC<IQuestionTableProps> = ({
    defaultQuestionList = [],
    defaultTotal = 0,
    defaultSearchParams
}) => {
    const [questionList, setQuestionList] = useState<API.QuestionVO[]>(defaultQuestionList)
    const [total, setTotal] = useState<number>(defaultTotal)
    const [init, setInit] = useState<boolean>(true)
    const columns = [
        {
            title: '题目',
            dataIndex: 'title',
            render: (_, record) => <Link href={`/questions/${record.id}`}>{record.title}</Link>
        },
        {
            title: '标签',
            dataIndex: 'tagList',
            valueType: 'select',
            fieldProps: {
                mode: 'tags'
            },
            render: (_, record) => <TagList tags={record.tagList as string[]} />
        }
    ] as ProColumns<API.QuestionVO>[]
    return (
        <div className={styles['question-table']}>
            <ProTable<API.QuestionVO>
                columns={columns}
                search={{ labelWidth: 'auto' }}
                size='large'
                pagination={
                    {
                        pageSize: DEFAULT_PAGE_SIZE,
                        total
                    } as TablePaginationConfig
                }
                style={{ width: '100%' }}
                form={{
                    initialValues: defaultSearchParams
                }}
                dataSource={questionList}
                options={false}
                request={async (params, sorter) => {
                    if (init) {
                        setInit(false)
                        if (defaultQuestionList && defaultTotal) {
                            return {
                                data: defaultQuestionList,
                                total: defaultTotal,
                                success: true
                            }
                        }
                    }
                    const sortField = Object.keys(sorter)?.[0]
                    const sortOrder = sorter?.[sortField] || 'descend'
                    const { data, code } = await listQuestionVoByPageUsingPost({
                        ...params,
                        sortField,
                        sortOrder
                    })
                    const newTotal = Number(data?.total) || 0
                    setTotal(newTotal)
                    const newData = data?.records || []
                    setQuestionList(newData)
                    return {
                        success: code === 0,
                        data: newData,
                        total: newTotal
                    }
                }}
            />
        </div>
    )
}

export default QuestionTable
