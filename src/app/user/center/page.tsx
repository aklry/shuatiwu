'use client'

import React, { memo, useState } from 'react'
import styles from './index.module.scss'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Avatar, Card, Col, Row } from 'antd'
import Meta from 'antd/es/card/Meta'
import Title from 'antd/es/typography/Title'
import Paragraph from 'antd/es/typography/Paragraph'
import CalendarChart from './components/calendar-chart'
import { EditOutlined } from '@ant-design/icons'
import InfoModal from './components/info-modal'

const UserCenter: React.FC = memo(() => {
    const { user } = useSelector(
        (state: RootState) => ({
            user: state.loginUser.defaultUser
        }),
        shallowEqual
    )
    const [activeTabKey, setActiveTabKey] = useState<string>('record')
    const [visible, setVisible] = useState<boolean>(false)
    return (
        <div className={styles['user-center']}>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={6}>
                    <Card
                        className={styles['user-info']}
                        title='个人信息'
                        extra={<EditOutlined onClick={() => setVisible(true)} />}
                    >
                        <Avatar
                            className={styles['avatar']}
                            size={72}
                            src={user.userAvatar ?? 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                        />
                        <Meta
                            title={
                                <Title level={4} style={{ marginBottom: 0 }}>
                                    {user.userName}
                                </Title>
                            }
                            description={
                                <>
                                    <Paragraph type='secondary'>{user.userProfile}</Paragraph>
                                </>
                            }
                        />
                    </Card>
                </Col>
                <Col xs={24} md={18}>
                    <Card
                        tabList={[
                            {
                                key: 'record',
                                label: '刷题记录'
                            },
                            {
                                key: 'others',
                                label: '其他'
                            }
                        ]}
                        activeTabKey={activeTabKey}
                        onTabChange={key => setActiveTabKey(key)}
                    >
                        {activeTabKey === 'record' && <CalendarChart />}
                        {activeTabKey === 'others' && (
                            <div className={styles['others']}>
                                <Title level={4}>其他</Title>
                                <Paragraph>暂无其他信息</Paragraph>
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
            <InfoModal visible={visible} initialValues={user} onCancel={() => setVisible(false)} />
        </div>
    )
})

export default UserCenter
