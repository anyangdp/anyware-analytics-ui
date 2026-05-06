import http from '@/plugins/axios/http'
import type { MenuEditReq, MenuListReq, MenuListRes } from '@/api/system/interfaces/menu.interface'

/**
 * @description 获取全部菜单
 * @param params {MenuListReq} 职位请求参数
 */
export const listMenu = (params: MenuListReq) => {
	return http.post<MenuListRes[]>('/s/permission/list', params)
}

/**
 * @description 新增菜单
 * @param params {MenuEditReq} 机构请求参数
 */
export const addMenu = (params: MenuEditReq) => {
	return http.post('/api/sys/menu/add', params)
}

/**
 * @description 修改菜单
 * @param params {MenuEditReq} 机构请求参数
 */
export const editMenu = (params: MenuEditReq) => {
	return http.post('/api/sys/menu/update', params)
}

/**
 * @description 删除菜单
 * @param id {number} 主键 id
 */
export const delMenu = (id: number) => {
	return http.post('/api/sys/menu/delete', { id: id })
}
