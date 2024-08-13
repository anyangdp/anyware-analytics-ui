import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type {
	OperationUnitEditReq,
	OperationUnitPageReq,
	OperationUnitPageRes,
	RelationListReq,
	RelationListRes,
	RelationSiteReq,
	UnRelationListReq,
	UnRelationListRes,
	UnRelationSiteReq
} from '@/api/base/interfaces/operationUnit.interface'

/**
 * @description 分页获取列表
 */
export const getRecordPage = (params: OperationUnitPageReq) => {
	return http.get<ApiPageResult<OperationUnitPageRes[]>>('/api/base/operationunit/page', params)
}

/**
 * @description 新增
 */
export const addRecord = (params: OperationUnitEditReq) => {
	return http.post('/api/base/operationunit/add', params)
}

/**
 * @description 修改
 */
export const editRecord = (params: OperationUnitEditReq) => {
	return http.post('/api/base/operationunit/update', params)
}

/**
 * @description 删除
 */
export const delRecord = (id: number) => {
	return http.post('/api/base/operationunit/delete', { id: id })
}

/**
 * @description 已关联列表
 */
export const relationList = (params: RelationListReq) => {
	return http.get<RelationListRes[]>('/api/base/operationunit/relationlist', params)
}

/**
 * @description 已关联列表
 */
export const unRelationList = (params: UnRelationListReq) => {
	return http.get<UnRelationListRes[]>('/api/base/operationunit/unrelationlist', params)
}

/**
 * @description 关联监测现场
 */
export const relationSite = (params: RelationSiteReq) => {
	return http.post('/api/base/operationunit/relation', params)
}

/**
 * @description 取消关联监测现场
 */
export const unRelationSite = (params: UnRelationSiteReq) => {
	return http.post('/api/base/operationunit/unrelation', params)
}
