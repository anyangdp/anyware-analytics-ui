import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type { BdEtlTaskInfoDTO, BdEtlTaskInfoPageDTO } from '@/api/bigData/etl/etl.interface'


/**
 * @description 分页获取etl任务列表
 * @param page
 * @param pageSize
 * @param params {DatasourcePageReq} etl任务请求参数
 */
export const getEtlTaskInfoPage = (params: BdEtlTaskInfoPageDTO) => {
	return http.post<ApiPageResult<BdEtlTaskInfoDTO[]>>(`/bdEtlTaskInfo/page/${params.page}/${params.pageSize}`, params)
}

/**
 * @description 新增etl任务
 */
export const addEtlTaskInfo = (params: BdEtlTaskInfoDTO) => {
	return http.post('/bdEtlTaskInfo/create', params)
}

/**
 * @description 修改etl任务
 */
export const editEtlTaskInfo = (params: BdEtlTaskInfoDTO) => {
	return http.put('/bdEtlTaskInfo/update', params)
}

/**
 * @description 删除etl任务
 * @param id {number} 主键 id
 */
export const delEtlTaskInfo = (id: number) => {
	return http.delete(`/bdEtlTaskInfo/${id}`)
}

/**
 * @description 启用/禁用etl任务
 */
export const activeEtlTaskInfo = (id: number, active: boolean = false) => {
	return http.get(`/bdEtlTaskInfo/active/${id}/${active}`)
}
/**
 * @description 执行etl任务
 */
export const executeEtlTask = (id: number) => {
	return http.get(`/bdEtlTaskInfo/execute/${id}`)
}
