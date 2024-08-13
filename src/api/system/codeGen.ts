import http from '@/plugins/axios/http'
import type { ApiPageResult } from '@/plugins/axios/interfaces/http.interface'
import type { CodeGenConfigListRes, CodeGenEditReq, CodeGenPageReq, CodeGenPageRes } from '@/api/system/interfaces/codeGen.interface'

/**
 * @description 获取应用程序保存位置
 */
export const getApplicationNamespaces = () => {
	return http.get<string[]>('/api/sys/codegen/application-namespace')
}

/**
 * @description 获取配置列表
 */
export const getCodeGenConfigList = (params: { id: number }) => {
	return http.get<CodeGenConfigListRes[]>('/api/sys/codegen/code-gen-config-list', params)
}

/**
 * @description 获取配置列表
 */
export const updateCodeGenConfig = (params: CodeGenConfigListRes[]) => {
	return http.post('/api/sys/codegen/update-gen-config', params)
}

/**
 * @description 分页获取列表
 * @param params {CodeGenPageReq} 请求参数
 */
export const getRecordPage = (params: CodeGenPageReq) => {
	return http.get<ApiPageResult<CodeGenPageRes[]>>('/api/sys/gen/page', params)
}

/**
 * @description 新增
 */
export const addRecord = (params: CodeGenEditReq) => {
	return http.post('/api/sys/gen/add', params)
}

/**
 * @description 修改
 */
export const editRecord = (params: CodeGenEditReq) => {
	return http.post('/api/sys/gen/update', params)
}

/**
 * @description 删除
 * @param id {number} 主键 id
 */
export const delRecord = (id: number) => {
	return http.post('/api/sys/gen/delete', { id: id })
}

/**
 * @description 生成
 */
export const buildRecord = (params: CodeGenPageRes) => {
	return http.post('/api/sys/gen/build', params)
}
