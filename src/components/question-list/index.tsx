'use client'
import { Card, List } from 'antd'
import Link from 'next/link'
import TagList from '@/components/tag-list'

interface Props {
    questionList: API.QuestionVO[]
}

/**
 * 题目列表组件
 * @param props
 * @constructor
 */
const QuestionList = (props: Props) => {
    const { questionList = [] } = props

    return (
        <Card className='question-list'>
            <List
                dataSource={questionList}
                renderItem={(item: API.QuestionVO) => (
                    <List.Item extra={<TagList tags={item.tagList as string[]} />}>
                        <List.Item.Meta title={<Link href={`/questions/${item.id}`}>{item.title}</Link>} />
                    </List.Item>
                )}
            />
        </Card>
    )
}

export default QuestionList
