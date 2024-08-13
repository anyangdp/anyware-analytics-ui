import http from '@/plugins/axios/http'
import type { OrgEditReq, OrgTreeListReq, OrgTreeListRes } from '@/api/system/interfaces/org.interface'

/**
 * @description 分页获取机构列表
 * @param params {OrgTreeListReq} 机构请求参数
 */
export const getOrgTreeList = (params: OrgTreeListReq) => {
	return http.get<OrgTreeListRes[]>('/api/sys/org/tree', params)
}

/**
 * @description
 * @param params {OrgEditReq} 机构请求参数
 */
export const addOrg = (params: OrgEditReq) => {
	return http.post('/api/sys/org/add', params)
}

/**
 * @description 修改机构
 * @param params {OrgEditReq} 机构请求参数
 */
export const editOrg = (params: OrgEditReq) => {
	return http.post('/api/sys/org/update', params)
}

/**
 * @description 删除机构
 * @param id {number} 主键 id
 */
export const delOrg = (id: number) => {
	return http.post('/api/sys/org/delete', { id: id })
}
