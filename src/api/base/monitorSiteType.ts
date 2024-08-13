import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type { MonitorSiteTypeEditReq, MonitorSiteTypePageReq, MonitorSiteTypePageRes } from '@/api/base/interfaces/monitorSiteType.interface'

/**
 * 分页获取列表
 */
export const getRecordPage = (params: MonitorSiteTypePageReq) => {
	return http.get<ApiPageResult<MonitorSiteTypePageRes[]>>('/api/base/monitorsitetype/page', params)
}

/**
 * 新增
 */
export const addRecord = (params: MonitorSiteTypeEditReq) => {
	return http.post('/api/base/monitorsitetype/add', params)
}

/**
 * 修改
 */
export const editRecord = (params: MonitorSiteTypeEditReq) => {
	return http.post('/api/base/monitorsitetype/update', params)
}

/**
 * 删除
 */
export const delRecord = (id: number) => {
	return http.post('/api/base/monitorsitetype/delete', { id: id })
}
