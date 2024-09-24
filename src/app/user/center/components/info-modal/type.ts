export interface InFoModalProps {
    visible: boolean
    initialValues?: API.UserUpdateMyRequest
    onCancel?: () => void
    onsubmit?: () => void
}
