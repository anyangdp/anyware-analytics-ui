import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type { ConfigEditReq, ConfigPageReq, ConfigPageRes } from '@/api/system/interfaces/config.interface'

/**
 * @description 分页获取列表
 * @param params {ConfigPageReq} 请求参数
 */
export const getConfigPage = (params: ConfigPageReq) => {
  return http.get<ApiPageResult<ConfigPageRes[]>>('/api/sys/config/page', params)
}

/**
 * @description 新增
 */
export const addConfig = (params: ConfigEditReq) => {
  return http.post('/api/sys/config/add', params)
}

/**
 * @description 修改
 */
export const editConfig = (params: ConfigEditReq) => {
  return http.post('/api/sys/config/update', params)
}

/**
 * @description 删除
 * @param id {number} 主键 id
 */
export const delConfig = (id: number) => {
  return http.post('/api/sys/config/delete', { id: id })
}
