import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type { EmissionTemplateEditReq, EmissionTemplatePageReq, EmissionTemplatePageRes } from '@/api/base/interfaces/emissionTemplate.interface'

/**
 * @description 分页获取列表
 */
export const getRecordPage = (params: EmissionTemplatePageReq) => {
	return http.get<ApiPageResult<EmissionTemplatePageRes[]>>('/api/base/emissionTemplate/page', params)
}

/**
 * @description 新增
 */
export const addRecord = (params: EmissionTemplateEditReq) => {
	return http.post('/api/base/emissionTemplate/add', params)
}

/**
 * @description 修改
 */
export const editRecord = (params: EmissionTemplateEditReq) => {
	return http.post('/api/base/emissionTemplate/update', params)
}

/**
 * @description 删除
 */
export const delRecord = (id: number) => {
	return http.post('/api/base/emissionTemplate/delete', { id: id })
}