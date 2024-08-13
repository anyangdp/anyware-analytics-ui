import type { AllListDictRes } from '@/api/system/interfaces/dict.interface'

/**
 * @description 定义用户状态接口参数
 * @param {UserInfoProps} userInfo 用户信息
 * @param {string} token 用于 api 请求
 * @param {boolean} rememberMe 记住我
 */
export interface UserState {
	userInfo: UserInfoProps | undefined
	token: string
	refreshToken: string
	tokenExpires: string
	dictList: Array<AllListDictRes>
}

/**
 * @description 用户信息
 * @param {number} userId 用户 id
 * @param {string} name 用户名称
 * @param {string} avatar 用户头像
 */
export interface UserInfoProps {
	userId: number
	name?: string
	avatar?: string
}
