'use server'
import React from 'react'
import { IQuestionDetailProps } from './type'
import { getQuestionVoByIdUsingGet } from '@/api/questionController'
import QuestionCard from '@/components/question-card'
import styles from './index.module.scss'

const QuestionDetail: React.FC<IQuestionDetailProps> = async ({ params }) => {
    let questionDetail = {} as API.QuestionVO
    const { questionId } = params

    try {
        const res = await getQuestionVoByIdUsingGet({
            id: parseInt(questionId)
        })
        questionDetail = res.data as API.QuestionVO
    } catch (e: any) {
        console.log(e.message)
    }

    return (
        <div className={styles['question-details']}>
            <QuestionCard question={questionDetail} />
        </div>
    )
}

export default QuestionDetail
