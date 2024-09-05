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
	dictList: Array<AllListDictRes>
}

/**
 * @description 用户信息
 * @param {string} userId 用户 id
 * @param {string} username 账号
 * @param {string} nickname 用户名称
 * @param {string} avatar 用户头像
 */
export interface UserInfoProps {
	id: string
	username: string
	nickname?: string
	avatar?: string
}
