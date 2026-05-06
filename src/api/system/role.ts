import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type { RoleEditReq, RoleListRes, RolePageReq, RolePageRes } from '@/api/system/interfaces/role.interface'

/**
 * @description 获取全部列表
 */
export const listRole = () => {
	return http.get<RoleListRes[]>('/api/sys/role/list')
}

/**
 * @description 分页获取列表
 * @param params {RolePageReq} 角色请求参数
 */
export const getRolePage = (params: RolePageReq) => {
	return http.post<ApiPageResult<RolePageRes[]>>(`/sRole/page/${params.page}/${params.pageSize}`, params)
}

/**
 * @description 获取角色所拥有菜单集合
 * @param id {number} 角色 id
 */
export const getRoleOwnMenuList = (id: number) => {
	return http.get<number[]>(`/sRole/authority/${id}`, {  })
}

/**
 * @description 增加
 * @param params {OrgEditReq} 请求参数
 */
export const addRole = (params: RoleEditReq) => {
	return http.post('/sRole/create', params)
}

/**
 * @description 修改
 * @param params {OrgEditReq} 请求参数
 */
export const editRole = (params: RoleEditReq) => {
	return http.put('/sRole/update', params)
}

export const authorize = (params: RoleEditReq) => {
	return http.post('/sRole/authorize', params)
}

/**
 * @description 删除
 * @param id {number} 主键 id
 */
export const delRole = (id: number) => {
	return http.delete(`/sRole/${id}`)
}
