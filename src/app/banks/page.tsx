'use server'
import React from 'react'
import styles from './index.module.scss'
import { listQuestionBankVoByPageUsingPost } from '@/api/questionBankController'
import QuestionBankList from '@/components/question-bank-list'
import Title from 'antd/es/typography/Title'

const Banks: React.FC = async () => {
    let questionBankList = [] as API.QuestionBankVO[]
    const pageSize = 200
    try {
        const res = await listQuestionBankVoByPageUsingPost({
            pageSize,
            sortField: 'createTime',
            sortOrder: 'descend'
        })
        questionBankList = res.data?.records ?? []
    } catch (e: any) {
        console.error(e)
    }
    return (
        <div className={styles['banks-container']}>
            <Title level={3}>题库大全</Title>
            <QuestionBankList questionBankList={questionBankList} />
        </div>
    )
}

export default Banks
