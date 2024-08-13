/**
 * @description 分页获取职位列表请求参数
 * @param name {string} 职位名称
 * @param code {string} 职位编号
 */
export interface PosPageReq {
    name?: string
    code?: string
}

/**
 * @description 分页获取职位列表返回值
 * @param id {number} 主键 id
 * @param name {string} 职位名称
 * @param code {string} 职位编号
 * @param orderNo {number} 排序
 * @param remark {string} 备注
 * @param status {number} 状态
 * @param createTime {string} 创建日期
 */
export interface PosPageRes {
    id: number
    name: string
    code: string
    orderNo: number
    remark?: string
    status: number
    createTime: string
}

/**
 * @description 职位编辑请求参数
 * @param id {number} 主键 id
 * @param name {string} 职位名称
 * @param code {string} 职位编号
 * @param orderNo {number} 排序
 * @param remark {string} 备注
 * @param status {number} 状态
 * @param createTime {string} 创建日期
 */
export interface PosEditReq {
    id?: number
    name: string
    code: string
    orderNo: number
    remark?: string
    status: number
    createTime: string
}