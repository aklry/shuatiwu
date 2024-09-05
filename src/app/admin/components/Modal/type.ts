import { ProColumns } from '@ant-design/pro-components'

export interface IModalProps {
    title: string
    visible: boolean
    columns: ProColumns<API.User>[]
    onSubmit: (values: API.UserAddRequest | API.UserUpdateRequest) => void
    onCancel: () => void
    oldData?: API.User
}
