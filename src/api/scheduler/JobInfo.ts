import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type { SchedulerJobInfoDTO, SchedulerJobInfoDTOPageDTO } from '@/api/scheduler/jobinfo.interface'

const prefix = "/schedulerJobInfo"
/**
 * @description 分页获取调度任务列表
 * @param page
 * @param pageSize
 * @param params {DatasourcePageReq} 调度任务请求参数
 */
export const getJobInfoPage = (params: SchedulerJobInfoDTOPageDTO) => {
	return http.post<ApiPageResult<SchedulerJobInfoDTO[]>>(`${prefix}/page/${params.page}/${params.pageSize}`, params)
}

/**
 * @description 新增调度任务
 */
export const addJobInfoDetails = (params: SchedulerJobInfoDTO) => {
	return http.post('${prefix}/create', params)
}

/**
 * @description 修改调度任务
 */
export const editJobInfoDetails = (params: SchedulerJobInfoDTO) => {
	return http.put(`${prefix}/update`, params)
}

/**
 * @description 删除调度任务
 * @param jobName {SchedulerJobInfoDTO} 任务对象
 */
export const delJobInfoDetails = (id: number) => {
	return http.delete(`${prefix}/${id}`)
}

/**
 * @description 启用/暂停调度任务
 * @param jobName {SchedulerJobInfoDTO} 任务对象
 */
export const activeJobInfoDetails = (id: number, active: boolean = false) => {
	return http.get(`${prefix}/active/${id}/${active}`)
}

