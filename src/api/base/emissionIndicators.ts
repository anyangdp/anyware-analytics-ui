import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type {
	EmissionIndicatorsEditReq,
	EmissionIndicatorsListRes,
	EmissionIndicatorsPageReq,
	EmissionIndicatorsPageRes,
	EmissionMethodListRes
} from '@/api/base/interfaces/emissionIndicators.interface'

/**
 * @description 分页获取列表
 */
export const getRecordPage = (params: EmissionIndicatorsPageReq) => {
	return http.get<ApiPageResult<EmissionIndicatorsPageRes[]>>('/api/base/emissionindicators/page', params)
}

/**
 * @description 新增
 */
export const addRecord = (params: EmissionIndicatorsEditReq) => {
	return http.post('/api/base/emissionindicators/add', params)
}

/**
 * @description 修改
 */
export const editRecord = (params: EmissionIndicatorsEditReq) => {
	return http.post('/api/base/emissionindicators/update', params)
}

/**
 * @description 删除
 */
export const delRecord = (id: number) => {
	return http.post('/api/base/emissionindicators/delete', { id: id })
}

/**
 * @description 列表
 */
export const getEmissionIndicatorsList = () => {
	return http.get<EmissionIndicatorsListRes[]>('/api/base/emissionIndicators/list')
}

/**
 * @description 检测指标方式列表
 */
export const getEmissionMethodList = (data: { id: number }) => {
	return http.get<EmissionMethodListRes[]>('/api/base/emissionMethod/list', data)
}
