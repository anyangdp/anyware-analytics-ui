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

export interface ApiPageResult<T = any> {
  current: number
  records: T[]
  pages: number
  size: number
  total: number
}
