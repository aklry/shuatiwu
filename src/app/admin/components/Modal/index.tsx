import React, { useRef, useEffect, useState } from 'react'
import { IModalProps } from './type'
import { Form, message, Modal, Select } from 'antd'
import { type ActionType, ProTable } from '@ant-design/pro-components'
import {
    addQuestionBankQuestionUsingPost,
    listQuestionBankQuestionVoByPageUsingPost,
    removeQuestionBankQuestionUsingPost
} from '@/api/questionBankQuestionController'
import { listQuestionBankVoByPageUsingPost } from '@/api/questionBankController'

const CommonModal: React.FC<IModalProps> = ({
    visible,
    title,
    columns,
    onSubmit,
    onCancel,
    oldData,
    isEditBank,
    questionBankId
}) => {
    const activeRef = useRef<ActionType>()
    const initialValues = oldData && { ...oldData }
    const [form] = Form.useForm()
    const [questionBankList, setQuestionBankList] = useState<API.QuestionBankVO[]>([])
    if (initialValues && initialValues.tags) {
        initialValues.tags = JSON.parse(initialValues.tags)
    }
    const getCurrentQuestionBankId = async () => {
        try {
            const res = await listQuestionBankQuestionVoByPageUsingPost({
                questionId: questionBankId,
                pageSize: 20
            })
            let list = (res.data?.records ?? []).map(item => item.questionBankId)
            list = Array.from(new Set(list))
            form.setFieldValue('question_bank_id', list)
        } catch (e: any) {
            console.log(e.message)
        }
    }
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
    useEffect(() => {
        if (questionBankId) {
            void getCurrentQuestionBankId()
        }
    }, [questionBankId])
    useEffect(() => {
        void getQuestionBankList()
    }, [])
    const handleSelect = async (value: number) => {
        const res = await addQuestionBankQuestionUsingPost({
            questionId: questionBankId,
            questionBankId: value
        })
        if (res.data && res.data > 0) {
            message.success('添加成功')
        } else {
            message.error('添加失败,' + res.message)
        }
    }
    const handleDeSelect = async (value: number) => {
        const res = await removeQuestionBankQuestionUsingPost({
            questionId: questionBankId,
            questionBankId: value
        })
        if (res.data) {
            message.success('移除成功')
        } else {
            message.error('移除失败,' + res.message)
        }
    }
    return (
        <div className='modal'>
            <Modal title={title} footer={null} onCancel={onCancel} destroyOnClose open={visible}>
                {!isEditBank ? (
                    <ProTable
                        columns={columns}
                        type='form'
                        form={{
                            initialValues
                        }}
                        onReset={() => activeRef.current?.reset?.()}
                        onSubmit={onSubmit}
                    />
                ) : (
                    <Form form={form}>
                        <Form.Item label='所属题库' name='question_bank_id'>
                            <Select
                                mode='tags'
                                options={questionBankList.map(item => ({
                                    label: item.title,
                                    value: item.id
                                }))}
                                onSelect={handleSelect}
                                onDeselect={handleDeSelect}
                            />
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </div>
    )
}

export default CommonModal
