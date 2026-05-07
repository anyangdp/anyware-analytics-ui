import http from '@/plugins/axios/http'
import type { MenuEditReq, MenuListReq, MenuListRes } from '@/api/system/interfaces/menu.interface'

export const listMenu = (params: MenuListReq) => {
	return http.post<MenuListRes[]>('/s/permission/list', params)
}

export const addMenu = (params: MenuEditReq) => {
	return http.post('/s/permission/create', params)
}

export const editMenu = (params: MenuEditReq) => {
	return http.put('/s/permission/update', params)
}

export const delMenu = (id: string) => {
	return http.delete(`/s/permission/${id}`)
}