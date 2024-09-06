import axios, { type InternalAxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/modules/user'
import type { AxiosInstance, AxiosError, AxiosResponse } from 'axios'
import type { ApiResultResultData } from '@/plugins/axios/interfaces/http.interface'

/**
 * @description 是否刷新 token
 */
let isRefreshing: boolean = false

/**
 * @description 请求队列
 */
let requestList: any[] = [] as any[]

/**
 * @description 创建 axios 请求实例
 */
const axiosInstance: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API,
	// 设置请求超时，一般来说为 5 秒
	timeout: 15000,
	// 设置请求头类型：若非文件传输，一般情况下为 json
	headers: {
		'Content-Type': 'application/json;charset=UTF-8'
	}
})

/**
 * @description 请求拦截器
 */
axiosInstance.interceptors.request.use(
	config => {
		const userStore = useUserStore()
		const token = userStore.getToken
		if (token) {
			// 将 token 添加到请求报文头中
			config.headers!['Authorization'] = `Bearer ${token}`
		}

		/** 请求白名单，放置一些不需要`token`的接口（通过设置请求白名单，防止`token`过期后再请求造成的死循环问题） */
		const whiteList = ['doLogin', '/login', '/refresh-token', '/captcha']
		return whiteList.some(url => config.url?.endsWith(url))
			? config
			: new Promise(resolve => {
				const token = userStore.getToken
				if (token) {
					config.headers!['Authorization'] = `Bearer ${token}`
					resolve(config)
				} else {
					resolve(config)
				}
			})
	},
	(error: AxiosError) => {
		ElMessage.error(error.message)
		return Promise.reject(error)
	}
)

/**
 * @description 响应拦截器
 */
axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => {
		const res = response.data
		if (res.result) {
			//如果没有返回状态码，直接返回数据，针对于返回数据为 blob 类型
			return res.data
		} else {
			if (res.error.code === 1002 || res.error.code === 1000){
				ElMessage.error(res.error.message || "401错误")

			} else {
				ElMessage.error(res.error.message || "500错误，服务异常")
			}
			Promise.reject(res)
		}
	},
	async (error: AxiosError<ApiResultResultData>) => {
		// 处理 HTTP 网络错误
		let message = ''
		// HTTP 状态码
		const status = error.response?.status
		switch (status) {
			case 400:
				message = error.response?.data?.error?.message ?? '400错误'
				break
			case 401:
				const userStore = useUserStore()
				message = error.response?.data?.error?.message ?? '登录失效，请重新登录'
				await userStore.logout()
				break
			case 403:
				message = error.response?.data?.error?.message ?? '拒绝访问'
				break
			case 404:
				message = error.response?.data?.error?.message ?? '请求地址错误'
				break
			case 405:
				message = error.response?.data?.error?.message ?? '请求方法错误'
				break
			case 500:
				message = error.response?.data?.error?.message ?? '服务器故障'
				break
			default:
				message = error.response?.data?.error?.message ?? '网络连接故障'
				break
		}

		ElMessage.error(message)
		return Promise.reject(error)
	}
)

/**
 * @description 重连原始请求
 */
const retryOriginalRequest = (config: InternalAxiosRequestConfig<any>) => {
	return new Promise(resolve => {
		requestList.push((token: string) => {
			config.headers['Authorization'] = `Bearer ${token}`
			resolve(config)
		})
	})
}

export default axiosInstance
