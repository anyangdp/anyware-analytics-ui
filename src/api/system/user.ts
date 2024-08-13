import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type { ChangePwdReq, UserEditReq, UserInfoRes, UserPageReq, UserPageRes } from '@/api/system/interfaces/user.interface'

/**
 * @description 分页获取列表
 * @param params {PosPageReq} 请求参数
 */
export const getUserPage = (params: UserPageReq) => {
	return http.get<ApiPageResult<UserPageRes[]>>('/api/sys/user/page', params)
}

/**
 * @description 获取当前用户信息
 */
export const getCurrentUserInfo = () => {
	return http.get<UserInfoRes>('/api/sys/user/current-info')
}

/**
 * @description 增加
 * @param params {OrgEditReq} 请求参数
 */
export const addUser = (params: UserEditReq) => {
	return http.post('/api/sys/user/add', params)
}

/**
 * @description 修改
 * @param params {OrgEditReq} 请求参数
 */
export const editUser = (params: UserEditReq) => {
	return http.post('/api/sys/user/update', params)
}

/**
 * @description 重置用户密码
 * @param id {number} 主键 id
 */
export const resetPwd = (id: number) => {
	return http.post('/api/sys/user/reset', { id: id })
}

/**
 * @description 更改密码
 * @param params {ChangePwdReq} 请求参数
 */
export const changePwd = (params: ChangePwdReq) => {
	return http.post('/api/sys/user/change-pwd', params)
}

/**
 * @description 删除
 * @param id {number} 主键 id
 */
export const delUser = (id: number) => {
	return http.post('/api/sys/user/delete', { id: id })
}

/**
 * @description 设置用户状态
 * @param id {number} 主键 id
 */
export const setStatus = (id: number, status: number) => {
	return http.post('/api/sys/user/status', { id: id, status: status })
}
