import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type { EquipmentModelEditReq, EquipmentModelPageReq, EquipmentModelPageRes } from '@/api/base/interfaces/equipmentModel.interface'

/**
 * @description 分页获取列表
 */
export const getRecordPage = (params: EquipmentModelPageReq) => {
	return http.get<ApiPageResult<EquipmentModelPageRes[]>>('/api/base/equipmentModel/page', params)
}

/**
 * @description 新增
 */
export const addRecord = (params: EquipmentModelEditReq) => {
	return http.post('/api/base/equipmentModel/add', params)
}

/**
 * @description 修改
 */
export const editRecord = (params: EquipmentModelEditReq) => {
	return http.post('/api/base/equipmentModel/update', params)
}

/**
 * @description 删除
 */
export const delRecord = (id: number) => {
	return http.post('/api/base/equipmentModel/delete', { id: id })
}