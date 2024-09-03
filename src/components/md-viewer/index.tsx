import { Viewer } from '@bytemd/react'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import 'bytemd/dist/index.css'
import 'highlight.js/styles/vs.css'
import { IMdViewerProps } from '@/components/md-viewer/type'
import React from 'react'

const plugins = [gfm(), highlight()]

/**
 * Markdown 浏览器
 * @param props
 * @constructor
 */
const MdViewer: React.FC<IMdViewerProps> = props => {
    const { value = '' } = props

    return (
        <div className='md-viewer'>
            <Viewer value={value} plugins={plugins} />
        </div>
    )
}

export default MdViewer
