import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type {
	EquipmentBrandEditReq,
	EquipmentBrandListRes,
	EquipmentBrandPageReq,
	EquipmentBrandPageRes
} from '@/api/base/interfaces/equipmentBrand.interface'

/**
 * @description 分页获取列表
 */
export const getRecordPage = (params: EquipmentBrandPageReq) => {
	return http.get<ApiPageResult<EquipmentBrandPageRes[]>>('/api/base/equipmentBrand/page', params)
}

/**
 * @description 新增
 */
export const addRecord = (params: EquipmentBrandEditReq) => {
	return http.post('/api/base/equipmentBrand/add', params)
}

/**
 * @description 修改
 */
export const editRecord = (params: EquipmentBrandEditReq) => {
	return http.post('/api/base/equipmentBrand/update', params)
}

/**
 * @description 删除
 */
export const delRecord = (id: number) => {
	return http.post('/api/base/equipmentBrand/delete', { id: id })
}

/**
 * @description 获取全部信息
 */
export const getListEquipmentBrand = () => {
	return http.get<EquipmentBrandListRes[]>('/api/base/equipmentBrand/list')
}
