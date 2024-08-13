import type { AxiosRequestConfig } from 'axios'

import axiosInstance from '@/plugins/axios/index'
import type { ApiResultResultData } from '@/plugins/axios/interfaces/http.interface'

/**
 * @description 导出封装的请求方法
 */
const http = {
	get<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<ApiResultResultData<T>> {
		return axiosInstance.get(url, { params, ...config })
	},

	post<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<ApiResultResultData<T>> {
		return axiosInstance.post(url, data, config)
	},

	put<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<ApiResultResultData<T>> {
		return axiosInstance.put(url, data, config)
	},

	delete<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<ApiResultResultData<T>> {
		return axiosInstance.delete(url, { data, ...config })
	}
}

export default http
