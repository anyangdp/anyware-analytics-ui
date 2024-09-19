import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type { BdEtlTaskInfoDTO, BdEtlTaskInfoPageDTO } from '@/api/bigData/etl/etl.interface'
import type { BdApiMetadataDTO, BdApiMetadataDTOPageDTO } from '@/api/bigData/api/apimetadata.interface'


/**
 * @description 分页获取etl任务列表
 * @param page
 * @param pageSize
 * @param params {DatasourcePageReq} etl任务请求参数
 */
export const getApiMetadataPage = (params: BdApiMetadataDTOPageDTO) => {
	return http.post<ApiPageResult<BdApiMetadataDTO[]>>(`/bdApiMetadata/page/${params.page}/${params.pageSize}`, params)
}

/**
 * @description 新增etl任务
 */
export const addApiMetadata = (params: BdApiMetadataDTO) => {
	return http.post('/bdApiMetadata/create', params)
}

/**
 * @description 修改etl任务
 */
export const editApiMetadata = (params: BdApiMetadataDTO) => {
	return http.put('/bdApiMetadata/update', params)
}

/**
 * @description 删除etl任务
 * @param id {number} 主键 id
 */
export const delApiMetadata = (id: number) => {
	return http.delete(`/bdApiMetadata/${id}`)
}

/**
 * @description 启用/禁用etl任务
 */
export const activeApiMetadata = (id: number, active: boolean = false) => {
	return http.get(`/bdApiMetadata/active/${id}/${active}`)
}
