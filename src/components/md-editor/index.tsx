'use client'
import React from 'react'
import { Editor } from '@bytemd/react'
import { IMdEditorProps } from './type'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import 'bytemd/dist/index.css'
import 'highlight.js/styles/vs.css'
import './index.scss'

const plugins = [gfm(), highlight()]

const MdEditor: React.FC<IMdEditorProps> = props => {
    const { value = '', onChange, placeholder } = props
    return (
        <div className='md-editor'>
            <Editor value={value} onChange={onChange} plugins={plugins} placeholder={placeholder} mode='split' />
        </div>
    )
}

export default MdEditor
