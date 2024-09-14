import React, { memo } from 'react'
import styles from './index.module.scss'
import Link from 'next/link'

const GlobalFooter: React.FC = memo(() => {
    return (
        <footer className={styles['global-footer']}>
            <div>© 2024&nbsp;&nbsp;智汇问道</div>
            <div>
                <Link href='http://doc.aklry.com' target='_blank'>
                    作者: aklry
                </Link>
            </div>
        </footer>
    )
})

export default GlobalFooter
