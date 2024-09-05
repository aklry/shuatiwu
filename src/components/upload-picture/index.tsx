'use client'
import React, { memo, useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import type { GetProp, UploadProps } from 'antd'
import { message, Upload } from 'antd'
import Image from 'next/image'
import { UploadPictureProps } from '@/components/upload-picture/type'
import { uploadFileUsingPost } from '@/api/fileController'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
        void message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        void message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
}

const UploadPicture: React.FC<UploadPictureProps> = memo(({ imageUrl, onChange, biz }) => {
    const [loading, setLoading] = useState(false)

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type='button'>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    )
    const handleRequest: UploadProps['customRequest'] = async info => {
        try {
            setLoading(true)
            const res = await uploadFileUsingPost({ biz }, {}, info.file as FileType)
            if (res.data) {
                setLoading(false)
                onChange?.(res.data)
            } else {
                message.error('上传图片失败, ' + res.message)
            }
        } catch (e: any) {
            message.error(e.message)
        }
    }

    return (
        <Upload
            listType='picture-card'
            showUploadList={false}
            customRequest={handleRequest}
            beforeUpload={beforeUpload}
        >
            {imageUrl ? <Image src={imageUrl} alt='avatar' width={100} height={100} /> : uploadButton}
        </Upload>
    )
})

export default UploadPicture
