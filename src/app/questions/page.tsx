import React, { memo } from 'react'
import styles from './index.module.scss'

const Questions: React.FC = memo(() => {
    return (
        <div className={styles['banks-container']}>
            <h1>Questions</h1>
        </div>
    )
})

export default Questions
