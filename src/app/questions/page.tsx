'use server'
import React from 'react'
import styles from './index.module.scss'
import QuestionTable from './components/question-table/index'
import Title from 'antd/es/typography/Title'
import { searchQuestionVoByPageUsingPost } from '@/api/questionController'
import { message } from 'antd'
import { DEFAULT_PAGE_SIZE } from '@/constants'
import { IQuestionProps } from './type'

const Questions: React.FC<IQuestionProps> = async ({ searchParams }) => {
    const { q: searchText } = searchParams
    // 题目列表和总数
    let questionList = [] as API.QuestionVO[]
    let total = 0

    try {
        const res = await searchQuestionVoByPageUsingPost({
            searchText,
            pageSize: DEFAULT_PAGE_SIZE,
            sortField: 'createTime',
            sortOrder: 'descend'
        })
        questionList = res.data?.records ?? []
        total = res.data?.total ?? 0
    } catch (e: any) {
        message.error('获取题目列表失败，' + e.message)
    }
    return (
        <div className={styles['question-container']}>
            <Title level={3}>题目大全</Title>
            <QuestionTable
                defaultQuestionList={questionList}
                defaultTotal={total}
                defaultSearchParams={{
                    title: searchText
                }}
            />
        </div>
    )
}

export default Questions
