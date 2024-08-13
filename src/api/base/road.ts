import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type { RoadEditReq, RoadPageReq, RoadPageRes } from '@/api/base/interfaces/road.interface'

/**
 * @description 分页获取列表
 * @param params {AppReleaseRecordPageReq} 请求参数
 */
export const getRecordPage = (params: RoadPageReq) => {
	return http.get<ApiPageResult<RoadPageRes[]>>('/api/base/road/page', params)
}

/**
 * @description 新增
 */
export const addRecord = (params: RoadEditReq) => {
	return http.post('/api/base/road/add', params)
}

/**
 * @description 修改
 */
export const editRecord = (params: RoadEditReq) => {
	return http.post('/api/base/road/update', params)
}

/**
 * @description 删除
 * @param id {number} 主键 id
 */
export const delRecord = (id: number) => {
	return http.post('/api/base/road/delete', { id: id })
}
