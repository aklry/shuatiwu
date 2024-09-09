'use client'
import { Card, List } from 'antd'
import Link from 'next/link'
import TagList from '@/components/tag-list'
import React from 'react'

interface Props {
    questionList: API.QuestionVO[]
    cardTitle?: React.ReactNode
    questionBankId?: number
}

/**
 * 题目列表组件
 * @param props
 * @constructor
 */
const QuestionList = (props: Props) => {
    const { questionList = [], cardTitle, questionBankId } = props

    return (
        <Card className='question-list' title={cardTitle}>
            <List
                dataSource={questionList}
                renderItem={(item: API.QuestionVO) => (
                    <List.Item extra={<TagList tags={item.tagList as string[]} />}>
                        <List.Item.Meta
                            title={
                                <Link
                                    href={
                                        questionBankId
                                            ? `/banks/${questionBankId}/question/${item.id}`
                                            : `/questions/${item.id}`
                                    }
                                >
                                    {item.title}
                                </Link>
                            }
                        />
                    </List.Item>
                )}
            />
        </Card>
    )
}

export default QuestionList
