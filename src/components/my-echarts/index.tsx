'use client'
import React, { memo, useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { MyEchartsProps } from './type'

const MyEcharts: React.FC<MyEchartsProps> = memo(props => {
    const { option } = props
    const echartsRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        // 初始化图表
        const myChart = echarts.init(echartsRef.current as HTMLDivElement)

        // 使用刚指定的配置项和数据显示图表
        myChart.setOption(option)

        // 处理窗口大小变化
        const handleResize = () => myChart.resize()
        window.addEventListener('resize', handleResize)

        // 清理函数
        return () => {
            window.removeEventListener('resize', handleResize)
            myChart.dispose()
        }
    }, [])
    return <div ref={echartsRef} style={{ width: '100%', height: '400px' }}></div>
})

export default MyEcharts
