export interface IBatchModalProps {
    questionIdList?: number[]
    batchVisible: boolean
    onCancel?: () => void
    onSubmit?: () => void
}
