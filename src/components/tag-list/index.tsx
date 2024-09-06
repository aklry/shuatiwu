import React from 'react'
import { ITagListProps } from '@/components/tag-list/type'
import { Tag } from 'antd'
import styles from './index.module.scss'

const TagList: React.FC<ITagListProps> = ({ tags = [], color = 'success' }) => {
    return (
        <div className={styles['tag-list']}>
            {tags.map(tag => (
                <Tag className={styles['tag-list-item']} key={tag} color={color}>
                    {tag}
                </Tag>
            ))}
        </div>
    )
}

export default TagList
