import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type { AppReleaseRecordEditReq, AppReleaseRecordPageReq, AppReleaseRecordPageRes } from '@/api/base/interfaces/appReleaseRecord.interface'

/**
 * @description 分页获取列表
 * @param params {AppReleaseRecordPageReq} 请求参数
 */
export const getAppReleaseRecordPage = (params: AppReleaseRecordPageReq) => {
	return http.get<ApiPageResult<AppReleaseRecordPageRes[]>>('/api/base/release/page', params)
}

/**
 * @description 新增
 */
export const addRecord = (params: AppReleaseRecordEditReq) => {
	return http.post('/api/base/release/add', params)
}

/**
 * @description 修改
 */
export const editRecord = (params: AppReleaseRecordEditReq) => {
	return http.post('/api/base/release/update', params)
}

/**
 * @description 删除
 * @param id {number} 主键 id
 */
export const delRecord = (id: number) => {
	return http.post('/api/base/release/delete', { id: id })
}
