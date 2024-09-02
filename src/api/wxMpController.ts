// @ts-ignore
/* eslint-disable */
import ryRequest from '@/services'

/** check GET /api/ */
export async function checkUsingGet(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.checkUsingGETParams,
    options?: { [key: string]: any }
) {
    return ryRequest.request<string>('/api/', {
        method: 'GET',
        params: {
            ...params
        },
        ...(options || {})
    })
}

/** receiveMessage POST /api/ */
export async function receiveMessageUsingPost(options?: { [key: string]: any }) {
    return ryRequest.request<any>('/api/', {
        method: 'POST',
        ...(options || {})
    })
}

/** setMenu GET /api/setMenu */
export async function setMenuUsingGet(options?: { [key: string]: any }) {
    return ryRequest.request<string>('/api/setMenu', {
        method: 'GET',
        ...(options || {})
    })
}
