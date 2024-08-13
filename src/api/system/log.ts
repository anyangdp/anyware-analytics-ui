import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type { LogExPageReq, LogExPageRes, LogOpPageReq, LogOpPageRes, LogVisPageReq, LogVisPageRes } from '@/api/system/interfaces/log.interface'

/**
 * @description 分页获取异常日志
 */
export const getLogExPage = (params: LogExPageReq) => {
	return http.get<ApiPageResult<LogExPageRes[]>>('/api/sys/log/ex/page', params)
}

/**
 * @description 分页获取访问日志
 */
export const getLogVisPage = (params: LogVisPageReq) => {
	return http.get<ApiPageResult<LogVisPageRes[]>>('/api/sys/log/vis/page', params)
}

/**
 * @description 分页获取操作日志
 */
export const getLogOpPage = (params: LogOpPageReq) => {
	return http.get<ApiPageResult<LogOpPageRes[]>>('/api/sys/log/op/page', params)
}
