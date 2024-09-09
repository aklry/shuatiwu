'use server'
import React from 'react'
import Title from 'antd/es/typography/Title'
import { Divider, Flex } from 'antd'
import Link from 'next/link'
import { listQuestionBankVoByPageUsingPost } from '@/api/questionBankController'
import { listQuestionVoByPageUsingPost } from '@/api/questionController'
import QuestionBankList from '@/components/question-bank-list'
import QuestionList from '@/components/question-list'
import styles from './page.module.scss'

const App: React.FC = async () => {
    let questionBankList = [] as API.QuestionBankVO[]
    let questionList = [] as API.QuestionVO[]
    try {
        const res = await listQuestionBankVoByPageUsingPost({
            pageSize: 12,
            sortField: 'createTime',
            sortOrder: 'descend'
        })
        questionBankList = res.data?.records ?? []
    } catch (e: any) {
        console.error(e)
    }

    try {
        const res = await listQuestionVoByPageUsingPost({
            pageSize: 12,
            sortField: 'createTime',
            sortOrder: 'descend'
        })
        questionList = res.data?.records ?? []
    } catch (e: any) {
        console.error(e)
    }
    return (
        <div className={styles['home']}>
            <Flex justify='space-between' align='center'>
                <Title level={3}>最新题库</Title>
                <Link href={'/banks'}>查看更多</Link>
            </Flex>
            <div>
                <QuestionBankList questionBankList={questionBankList} />
            </div>
            <Divider />
            <Flex justify='space-between' align='center'>
                <Title level={3}>最新题目</Title>
                <Link href={'/questions'}>查看更多</Link>
            </Flex>
            <div>
                <QuestionList questionList={questionList} />
            </div>
        </div>
    )
}

export default App
