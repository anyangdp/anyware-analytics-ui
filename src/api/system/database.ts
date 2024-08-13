import http from '@/plugins/axios/http'
import type { GenEntityReq, GenSeedDataReq, ListColumnRes, ListDatabaseRes, ListTableRes } from '@/api/system/interfaces/database.interface'

/**
 * @description 获取所有数据库列表
 */
export const getListDatabase = () => {
	return http.get<ListDatabaseRes[]>('/api/sys/database/list')
}

/**
 * @description 获取所有数据表列表
 */
export const getListTable = (configId: string, isGenEntity: boolean = false) => {
	return http.get<ListTableRes[]>('/api/sys/database/table-list', { configId: configId, isGenEntity: isGenEntity })
}

/**
 * @description 获取所有数据列列表
 */
export const getListColumn = (configId: string, tableName: string) => {
	return http.get<ListColumnRes[]>('/api/sys/database/column-list', { configId: configId, tableName: tableName })
}

/**
 * @description 生成实体
 */
export const genEntity = (params: GenEntityReq) => {
	return http.post('/api/sys/database/gen-entity', params)
}

/**
 * @description 生成实体
 */
export const genSeedData = (params: GenSeedDataReq) => {
	return http.post('/api/sys/database/gen-seed-data', params)
}
