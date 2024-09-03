import React from 'react'
import { Button, Result } from 'antd'

const Forbidden: React.FC = () => {
    return (
        <Result
            status='403'
            title='403'
            subTitle='抱歉，您无权访问此页面。'
            extra={
                <Button type='primary' href='/'>
                    返回首页
                </Button>
            }
        />
    )
}

export default Forbidden
