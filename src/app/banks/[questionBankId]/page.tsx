'use server'
import React from 'react'
import { IQuestionBankDetailProps } from './type'
import { getQuestionBankVoByIdUsingGet } from '@/api/questionBankController'
import styles from './index.module.scss'
import { Avatar, Button, Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import Title from 'antd/es/typography/Title'
import Paragraph from 'antd/es/typography/Paragraph'
import QuestionList from '@/components/question-list'

const QuestionBankDetail: React.FC<IQuestionBankDetailProps> = async ({ params }) => {
    const { questionBankId } = params
    let bankDetail = {} as API.QuestionBankVO
    let firstQuestionId: number = 0
    try {
        const res = await getQuestionBankVoByIdUsingGet({
            id: questionBankId,
            needQueryQuestionList: true,
            pageSize: 200
        })
        bankDetail = res.data as API.QuestionBankVO
        if (bankDetail.questionPage?.records && bankDetail.questionPage.records.length > 0) {
            firstQuestionId = bankDetail.questionPage.records[0].id as number
        }
    } catch (e: any) {
        console.error(e.message)
    }
    return (
        <div className={styles['question-bank-details']}>
            <Card>
                <Meta
                    avatar={<Avatar src={bankDetail.picture} size={72} />}
                    title={<Title level={3}>{bankDetail.title}</Title>}
                    description={<Paragraph type='secondary'>{bankDetail.description}</Paragraph>}
                />
                <Button
                    href={`/banks/${questionBankId}/question/${firstQuestionId}`}
                    shape='round'
                    target='_blank'
                    type='primary'
                >
                    开始刷题
                </Button>
            </Card>
            <div style={{ marginBottom: '20px' }} />
            <QuestionList
                questionList={bankDetail.questionPage?.records || []}
                cardTitle={`题目列表（${bankDetail.questionPage?.total || 0}）`}
                questionBankId={questionBankId}
            />
        </div>
    )
}

export default QuestionBankDetail
