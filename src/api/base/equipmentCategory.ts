import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type {
	EquipmentCategoryEditReq,
	EquipmentCategoryListRes,
	EquipmentCategoryPageReq,
	EquipmentCategoryPageRes
} from '@/api/base/interfaces/equipmentCategory.interface'

/**
 * @description 分页获取列表
 */
export const getRecordPage = (params: EquipmentCategoryPageReq) => {
	return http.get<ApiPageResult<EquipmentCategoryPageRes[]>>('/api/base/equipmentCategory/page', params)
}

/**
 * @description 新增
 */
export const addRecord = (params: EquipmentCategoryEditReq) => {
	return http.post('/api/base/equipmentCategory/add', params)
}

/**
 * @description 修改
 */
export const editRecord = (params: EquipmentCategoryEditReq) => {
	return http.post('/api/base/equipmentCategory/update', params)
}

/**
 * @description 删除
 */
export const delRecord = (id: number) => {
	return http.post('/api/base/equipmentCategory/delete', { id: id })
}

/**
 * @description 获取全部信息
 */
export const getListEquipmentCategory = () => {
	return http.get<EquipmentCategoryListRes[]>('/api/base/equipmentCategory/list')
}
