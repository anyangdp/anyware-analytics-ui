import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type { AssessmentItemEditReq, AssessmentItemPageReq, AssessmentItemPageRes } from '@/api/base/interfaces/assessmentItem.interface'

/**
 * @description 分页获取列表
 */
export const getRecordPage = (params: AssessmentItemPageReq) => {
	return http.get<ApiPageResult<AssessmentItemPageRes[]>>('/api/base/assessment/page', params)
}

/**
 * @description 新增
 */
export const addRecord = (params: AssessmentItemEditReq) => {
	return http.post('/api/base/assessment/add', params)
}

/**
 * @description 修改
 */
export const editRecord = (params: AssessmentItemEditReq) => {
	return http.post('/api/base/assessment/update', params)
}

/**
 * @description 删除
 * @param id {number} 主键 id
 */
export const delRecord = (id: number) => {
	return http.post('/api/base/assessment/delete', { id: id })
}
