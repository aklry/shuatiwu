import React, { useRef } from 'react'
import { IModalProps } from './type'
import { Modal } from 'antd'
import { type ActionType, ProTable } from '@ant-design/pro-components'

const CommonModal: React.FC<IModalProps> = ({ visible, title, columns, onSubmit, onCancel, oldData }) => {
    const activeRef = useRef<ActionType>()
    return (
        <div className='modal'>
            <Modal title={title} footer={null} onCancel={onCancel} destroyOnClose open={visible}>
                <ProTable
                    columns={columns}
                    type='form'
                    form={{ initialValues: oldData }}
                    onReset={() => activeRef.current?.reset?.()}
                    onSubmit={onSubmit}
                />
            </Modal>
        </div>
    )
}

export default CommonModal
