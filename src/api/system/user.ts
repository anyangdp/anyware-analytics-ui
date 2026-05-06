import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type { UserDTO, UserPageReq, ResetPasswordDTO, ChangePasswordDTO } from '@/api/system/interfaces/user.interface'

export const createUser = (params: UserDTO) => {
	return http.post('/user/create', params)
}

export const updateUser = (params: UserDTO) => {
	return http.put('/user/update', params)
}

export const resetPassword = (params: ResetPasswordDTO) => {
	return http.put('/user/reset/password', params)
}

export const changePassword = (params: ChangePasswordDTO) => {
	return http.put('/user/change/password', params)
}

export const getUserPage = (params: UserPageReq) => {
	return http.post<ApiPageResult<UserDTO[]>>(`/user/page/${params.page}/${params.pageSize}`, params)
}

export const getUserById = (id: string) => {
	return http.get<UserDTO>(`/user/retrieve/${id}`)
}

export const deleteUser = (id: string) => {
	return http.delete(`/user/${id}`)
}

export const activeUser = (id: string) => {
	return http.get(`/user/active/${id}/true`)
}

export const deActiveUser = (id: string) => {
	return http.get(`/user/active/${id}/false`)
}