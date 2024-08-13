import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type { PosEditReq, PosPageReq, PosPageRes } from '@/api/system/interfaces/pos.interface'

/**
 * @description 分页获取职位列表
 * @param params {PosPageReq} 职位请求参数
 */
export const getPosPage = (params: PosPageReq) => {
	return http.get<ApiPageResult<PosPageRes[]>>('/api/sys/pos/page', params)
}

/**
 * @description 获取全部职位信息
 * @param params {PosPageReq} 职位请求参数
 */
export const listPos = (params: PosPageReq) => {
	return http.get<PosPageRes[]>('/api/sys/pos/list', params)
}

/**
 * @description 新增职位
 */
export const addPos = (params: PosEditReq) => {
	return http.post('/api/sys/pos/add', params)
}

/**
 * @description 修改职位
 */
export const editPos = (params: PosEditReq) => {
	return http.post('/api/sys/pos/update', params)
}

/**
 * @description 删除职位
 * @param id {number} 主键 id
 */
export const delPos = (id: number) => {
	return http.post('/api/sys/pos/delete', { id: id })
}
