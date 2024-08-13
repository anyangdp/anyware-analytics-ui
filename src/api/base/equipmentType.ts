import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type {
	EquipmentTypeEditReq,
	EquipmentTypeListRes,
	EquipmentTypePageReq,
	EquipmentTypePageRes
} from '@/api/base/interfaces/equipmentType.interface'

/**
 * @description 分页获取列表
 */
export const getRecordPage = (params: EquipmentTypePageReq) => {
	return http.get<ApiPageResult<EquipmentTypePageRes[]>>('/api/base/equipmentType/page', params)
}

/**
 * @description 新增
 */
export const addRecord = (params: EquipmentTypeEditReq) => {
	return http.post('/api/base/equipmentType/add', params)
}

/**
 * @description 修改
 */
export const editRecord = (params: EquipmentTypeEditReq) => {
	return http.post('/api/base/equipmentType/update', params)
}

/**
 * @description 删除
 */
export const delRecord = (id: number) => {
	return http.post('/api/base/equipmentType/delete', { id: id })
}

/**
 * @description 获取全部信息
 */
export const listEquipmentType = () => {
	return http.get<EquipmentTypeListRes[]>('/api/base/equipmentType/list')
}
