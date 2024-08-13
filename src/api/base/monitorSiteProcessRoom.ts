import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type { MonitorSiteProcessRoomEditReq, MonitorSiteProcessRoomPageReq, MonitorSiteProcessRoomPageRes } from '@/api/base/interfaces/monitorSiteProcessRoom.interface'

/**
 * @description 分页获取列表
 */
export const getRecordPage = (params: MonitorSiteProcessRoomPageReq) => {
	return http.get<ApiPageResult<MonitorSiteProcessRoomPageRes[]>>('/api/base/monitorsiteprocessroom/page', params)
}

/**
 * @description 新增
 */
export const addRecord = (params: MonitorSiteProcessRoomEditReq) => {
	return http.post('/api/base/monitorsiteprocessroom/add', params)
}

/**
 * @description 修改
 */
export const editRecord = (params: MonitorSiteProcessRoomEditReq) => {
	return http.post('/api/base/monitorsiteprocessroom/update', params)
}

/**
 * @description 删除
 */
export const delRecord = (id: number) => {
	return http.post('/api/base/monitorsiteprocessroom/delete', { id: id })
}