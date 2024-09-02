import React, { memo } from 'react'
import { Button } from 'antd'

const App: React.FC = memo(() => {
    return (
        <div>
            <Button type='primary'>Primary Button</Button>
        </div>
    )
})

export default App
