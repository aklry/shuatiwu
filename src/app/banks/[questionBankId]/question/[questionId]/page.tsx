'use server'
import React from 'react'
import { IQuestionDetailProps } from './type'
import { getQuestionVoByIdUsingGet } from '@/api/questionController'
import QuestionCard from '@/components/question-card'
import { getQuestionBankVoByIdUsingGet } from '@/api/questionBankController'
import Link from 'next/link'
import { Flex, Menu } from 'antd'
import { MenuItemGroupType } from 'antd/es/menu/interface'
import Sider from 'antd/es/layout/Sider'
import Title from 'antd/es/typography/Title'
import { Content } from 'antd/es/layout/layout'
import styles from './index.module.scss'

const QuestionDetail: React.FC<IQuestionDetailProps> = async ({ params }) => {
    let questionDetail = {} as API.QuestionVO
    let bankDetail = {} as API.QuestionBankVO
    const { questionId, questionBankId } = params

    try {
        const res = await getQuestionBankVoByIdUsingGet({
            id: parseInt(questionBankId),
            needQueryQuestionList: true,
            pageSize: 200
        })
        bankDetail = res.data as API.QuestionBankVO
    } catch (e: any) {
        console.log(e.message)
    }

    try {
        const res = await getQuestionVoByIdUsingGet({
            id: parseInt(questionId)
        })
        questionDetail = res.data as API.QuestionVO
    } catch (e: any) {
        console.log(e.message)
    }

    // 题目菜单列表
    const questionMenuItemList = (bankDetail.questionPage?.records || []).map(question => {
        return {
            label: (
                <Link href={`/banks/${bankDetail.id}/question/${question.id}`} prefetch={false}>
                    {question.title}
                </Link>
            ),
            key: question.id
        }
    }) as MenuItemGroupType[]

    return (
        <div className={styles['question-detail']}>
            <Flex gap={24}>
                <Sider width={240} theme={'light'} style={{ padding: '24px 0' }}>
                    <Title level={4} style={{ padding: '0 20px' }}>
                        题库标题
                    </Title>
                    <Menu items={questionMenuItemList} selectedKeys={[questionId]} />
                </Sider>
                <Content>
                    <QuestionCard question={questionDetail} />
                </Content>
            </Flex>
        </div>
    )
}

export default QuestionDetail
