'use client'

import React, { memo, useEffect, useState } from 'react'
import { Button, Form, message, Modal, Select } from 'antd'
import { IBatchModalProps } from './type'
import { listQuestionBankVoByPageUsingPost } from '@/api/questionBankController'
import { batchAddQuestionsToBankUsingPost } from '@/api/questionBankQuestionController'

const BatchModal: React.FC<IBatchModalProps> = memo(({ questionIdList = [], batchVisible, onCancel, onSubmit }) => {
    const [form] = Form.useForm()
    const [questionBankList, setQuestionBankList] = useState<API.QuestionBankVO[]>([])
    const getQuestionBankList = async () => {
        try {
            const res = await listQuestionBankVoByPageUsingPost({
                pageSize: 200,
                sortField: 'createTime',
                sortOrder: 'descend'
            })
            const data = res.data?.records ?? []
            setQuestionBankList(data)
        } catch (e: any) {
            console.log(e.message)
        }
    }
    /**
     * 提交表单
     */
    const doSubmit = async (fields: any) => {
        const questionBankId = fields.questionBankId
        try {
            await batchAddQuestionsToBankUsingPost({
                questionIdList,
                questionBankId
            })
            message.success('批量添加成功')
            onSubmit?.()
        } catch (e: any) {
            message.error(e.message)
        }
    }
    useEffect(() => {
        void getQuestionBankList()
    }, [])
    return (
        <div className={'batch-modal'}>
            <Modal footer={null} title='批量添加题目' open={batchVisible} onCancel={() => onCancel?.()}>
                <Form form={form} onFinish={doSubmit}>
                    <Form.Item label='选择' name='question_bank_id'>
                        <Select
                            mode='tags'
                            options={questionBankList.map(item => ({
                                label: item.title,
                                value: item.id
                            }))}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
})

export default BatchModal
