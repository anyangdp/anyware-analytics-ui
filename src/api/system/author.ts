import http from '@/plugins/axios/http'
import type { CurrentUserInfoRes, LoginReq } from '@/api/system/interfaces/author.interface'

/**
 * @description 登录接口
 */
export function login(data: LoginReq) {
	return http.post<string>('/doLogin', data)
}

/**
 * @description 获取登录用户信息
 */
export function getUserInfo() {
	return http.get<CurrentUserInfoRes>('/currentUser')
}
