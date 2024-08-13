import http from '@/plugins/axios/http'
import type { CaptchaRes, CurrentUserInfoRes, LoginReq, LoginRes } from '@/api/system/interfaces/author.interface'

/**
 * @description 登录接口
 */
export function login(data: LoginReq) {
	return http.post<LoginRes>('/api/sys/author/login', data)
}

/**
 * @description 刷新 token
 */
export function userRefreshToken(data: { userId: string; refreshToken: string }) {
	return http.post<LoginRes>('/api/sys/author/refresh-token', data)
}

/**
 * @description 获取验证码接口
 */
export function getCaptchaImg() {
	return http.get<CaptchaRes>('/api/sys/author/captcha')
}

/**
 * @description 获取登录用户信息
 */
export function getUserInfo() {
	return http.get<CurrentUserInfoRes>('/api/sys/author/current-user-info')
}
