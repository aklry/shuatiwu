'use client'
import { Card } from 'antd'
import Title from 'antd/es/typography/Title'
import TagList from '@/components/tag-list'
import MdViewer from '@/components/md-viewer'
// import useAddUserSignInRecord from '@/hooks/useAddUserSignInRecord'
// import './index.css'

interface Props {
    question: API.QuestionVO
}

/**
 * 题目卡片
 * @param props
 * @constructor
 */
const QuestionCard = (props: Props) => {
    const { question } = props

    // 签到
    // useAddUserSignInRecord()

    return (
        <div className='question-card'>
            <Card>
                <Title level={1} style={{ fontSize: 24 }}>
                    {question.title}
                </Title>
                <TagList tags={question.tagList as string[]} />
                <div style={{ marginBottom: 16 }} />
                <MdViewer value={question.content} />
            </Card>
            <div style={{ marginBottom: 16 }} />
            <Card title='推荐答案'>
                <MdViewer value={question.answer} />
            </Card>
        </div>
    )
}

export default QuestionCard
