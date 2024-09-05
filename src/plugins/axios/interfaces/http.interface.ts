export interface Error {
  code: number,
  message: string,
  enMessage: string
}
/**
 * @description
 * @param error ==> 错误消息对象
 * @param result ==> 接口操作结果
 */
export interface ApiResult {
  error?: Error
  result: boolean
}

/**
 * @description 请求响应参数(包含 data)
 * @param result ==> 具体数据
 */
export interface ApiResultResultData<T = any> extends ApiResult {
  data?: T
}

/**
 * @description 请求分页返回
 * @param list {T[]} 数据
 * @param page {number} 页码
 * @param pageSize {number} 一页数量
 * @param total {number} 总数
 */
export interface ApiPageResult<T = any> {
  items: T[]
  page: number
  pageSize: number
  total: number
}
