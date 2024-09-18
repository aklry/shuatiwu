'use client'

import React, { memo, useEffect, useState } from 'react'
import { Button, Form, message, Modal, Select } from 'antd'
import { IBatchModalProps } from './type'
import { listQuestionBankVoByPageUsingPost } from '@/api/questionBankController'
import {
    batchAddQuestionsToBankUsingPost,
    batchRemoveQuestionsFromBankUsingPost
} from '@/api/questionBankQuestionController'

const BatchModal: React.FC<IBatchModalProps> = memo(
    ({ questionIdList = [], batchVisible, onCancel, onSubmit, title, type }) => {
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
            const isAdd = type === 'add'
            const questionBankId = fields['question_bank_id']
            if (!questionBankId) {
                message.error('请选择题库')
                return
            }
            const successMsg = isAdd ? '批量添加成功' : '批量移除成功'
            let res: API.BaseResponseBoolean_
            try {
                if (isAdd) {
                    res = await batchAddQuestionsToBankUsingPost({
                        questionIdList,
                        questionBankId
                    })
                } else {
                    res = await batchRemoveQuestionsFromBankUsingPost({
                        questionIdList,
                        questionBankId
                    })
                }
                if (res.code === 50001) {
                    return message.error(res.message + ', 该题库不包含该题目')
                }
                message.success(successMsg)
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
                <Modal footer={null} title={title} open={batchVisible} onCancel={() => onCancel?.()}>
                    <Form form={form} onFinish={doSubmit}>
                        <Form.Item label='选择' name='question_bank_id'>
                            <Select
                                mode={type === 'add' ? 'tags' : undefined}
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
    }
)

export default BatchModal
