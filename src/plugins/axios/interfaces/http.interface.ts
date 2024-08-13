/**
 * @description 请求响应参数(不包含 data)
 * @param code ==> 状态码
 * @param message ==> 错误消息
 * @param type ==> 类型：success、warning、error
 * @param success ==> 状态
 * @param time ==> 时间
 */
export interface ApiResult {
  code: number
  message: string
  type: string
  success?: boolean
  time: string
}

/**
 * @description 请求响应参数(包含 data)
 * @param result ==> 具体数据
 */
export interface ApiResultResultData<T = any> extends ApiResult {
  result: T
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
