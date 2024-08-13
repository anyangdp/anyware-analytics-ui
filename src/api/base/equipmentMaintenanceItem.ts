import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type { EquipmentMaintenanceItemEditReq, EquipmentMaintenanceItemPageReq, EquipmentMaintenanceItemPageRes } from '@/api/base/interfaces/equipmentMaintenanceItem.interface'

/**
 * @description 分页获取列表
 */
export const getRecordPage = (params: EquipmentMaintenanceItemPageReq) => {
	return http.get<ApiPageResult<EquipmentMaintenanceItemPageRes[]>>('/api/base/equipmentMaintenanceItem/page', params)
}

/**
 * @description 新增
 */
export const addRecord = (params: EquipmentMaintenanceItemEditReq) => {
	return http.post('/api/base/equipmentMaintenanceItem/add', params)
}

/**
 * @description 修改
 */
export const editRecord = (params: EquipmentMaintenanceItemEditReq) => {
	return http.post('/api/base/equipmentMaintenanceItem/update', params)
}

/**
 * @description 删除
 */
export const delRecord = (id: number) => {
	return http.post('/api/base/equipmentMaintenanceItem/delete', { id: id })
}