import http from '@/plugins/axios/http'
import type {
	AllListDictRes,
	DictTypePageReq,
	DictTypePageRes,
	DictTypeEditReq,
	DictDataPageReq,
	DictDataPageRes,
	DictDataEditReq
} from '@/api/system/interfaces/dict.interface'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'

/**
 * @description 获取所有字典列表
 */
export const getAllDictList = () => {
	return http.get<AllListDictRes[]>('/api/sys/dict/all-list')
}

/**
 * @description 分页获取列表
 * @param params {DictTypePageReq} 请求参数
 */
export const getDictTypePage = (params: DictTypePageReq) => {
	return http.get<ApiPageResult<DictTypePageRes[]>>('/api/sys/dict/type/page', params)
}

/**
 * @description 新增
 */
export const addDictType = (params: DictTypeEditReq) => {
	return http.post('/api/sys/dict/type/add', params)
}

/**
 * @description 修改
 */
export const editDictType = (params: DictTypeEditReq) => {
	return http.post('/api/sys/dict/type/update', params)
}

/**
 * @description 删除
 * @param id {number} 主键 id
 */
export const delDictType = (id: number) => {
	return http.post('/api/sys/dict/type/delete', { id: id })
}

/**
 * @description 分页获取列表
 * @param params {ConfigPageReq} 请求参数
 */
export const getDictDataPage = (params: DictDataPageReq) => {
	return http.get<ApiPageResult<DictDataPageRes[]>>('/api/sys/dict/data/page', params)
}

/**
 * @description 新增
 */
export const addDictData = (params: DictDataEditReq) => {
	return http.post('/api/sys/dict/Data/add', params)
}

/**
 * @description 修改
 */
export const editDictData = (params: DictDataEditReq) => {
	return http.post('/api/sys/dict/Data/update', params)
}

/**
 * @description 删除
 * @param id {number} 主键 id
 */
export const delDictData = (id: number) => {
	return http.post('/api/sys/dict/Data/delete', { id: id })
}
