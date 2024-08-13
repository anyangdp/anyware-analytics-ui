import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type { RiverWayEditReq, RiverWayPageReq, RiverWayPageRes } from '@/api/base/interfaces/riverWay.interface'

/**
 * @description 分页获取列表
 * @param params {AppReleaseRecordPageReq} 请求参数
 */
export const getRecordPage = (params: RiverWayPageReq) => {
	return http.get<ApiPageResult<RiverWayPageRes[]>>('/api/base/river/page', params)
}

/**
 * @description 新增
 */
export const addRecord = (params: RiverWayEditReq) => {
	return http.post('/api/base/river/add', params)
}

/**
 * @description 修改
 */
export const editRecord = (params: RiverWayEditReq) => {
	return http.post('/api/base/river/update', params)
}

/**
 * @description 删除
 * @param id {number} 主键 id
 */
export const delRecord = (id: number) => {
	return http.post('/api/base/river/delete', { id: id })
}
