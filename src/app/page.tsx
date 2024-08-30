import React, { memo } from 'react'
import { Button } from 'antd'

const Page: React.FC = memo(() => {
    return (
        <div>
            <Button type='primary'>Primary Button</Button>
        </div>
    )
})

export default Page
