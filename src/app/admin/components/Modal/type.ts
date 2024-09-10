import { ProColumns } from '@ant-design/pro-components'

export interface IModalProps {
    title: string
    visible: boolean
    columns?: ProColumns<API.Question | API.QuestionBank | API.User>[]
    onSubmit: (values: any) => void
    onCancel: () => void
    oldData?: any
    isEditBank?: boolean
    questionBankId?: number
}
