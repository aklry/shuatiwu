import React, { memo } from 'react'
import styles from './index.module.scss'

const Banks: React.FC = memo(() => {
    return (
        <div className={styles['questions-container']}>
            <h1>Banks</h1>
            <p>This is the banks page</p>
        </div>
    )
})

export default Banks
