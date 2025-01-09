import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type { BdDatasourceDTO, BdDatasourcePageDTO } from '@/api/bigData/datasource/datasource.interface'


/**
 * @description 分页获取数据源列表
 * @param page
 * @param pageSize
 * @param params {DatasourcePageReq} 数据源请求参数
 */
export const getDatasourcePage = (params: BdDatasourcePageDTO) => {
	return http.post<ApiPageResult<BdDatasourceDTO[]>>(`/bdDatasource/page/${params.page}/${params.pageSize}`, params)
}

/**
 * @description 获取文件列表
 * @param params {DatasourcePageReq} 数据源请求参数
 */
export const listFile = (params: BdDatasourceDTO) => {
	return http.post<BdDatasourceDTO[]>('/bdDatasource/{id}/file/list/status', params)
}

/**
 * @description 新增数据源
 */
export const addDatasource = (params: BdDatasourceDTO) => {
	return http.post('/bdDatasource/create', params)
}

/**
 * @description 修改数据源
 */
export const editDatasource = (params: BdDatasourceDTO) => {
	return http.put('/bdDatasource/update', params)
}

/**
 * @description 删除数据源
 * @param id {number} 主键 id
 */
export const delDatasource = (id: number) => {
	return http.delete(`/bdDatasource/${id}`)
}

/**
 * @description 启用/禁用数据源
 */
export const activeDatasource = (id: number, active: boolean = false) => {
	return http.get(`/bdDatasource/active/${id}/${active}`)
}
/**
 * @description 连通性测试
 */
export const connectTest = (id: string) => {
	return http.get(`/bdDatasource/connect/test/${id}`)
}
/**
 * @description 数据库表
 */
export const queryTable = (id: string) => {
	return http.get(`/bdDatasource/table/${id}`)
}

/**
 * @description 数据库表字段
 */
export const queryTableColumns = (id: string, tableName: string) => {
	return http.get(`/bdDatasource/table/${id}/${tableName}`)
}
