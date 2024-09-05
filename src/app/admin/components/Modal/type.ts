import { ProColumns } from '@ant-design/pro-components'

export interface IModalProps {
    title: string
    visible: boolean
    columns: ProColumns<API.User>[]
    onSubmit: (values: any) => void
    onCancel: () => void
    oldData?: any
}
