import type { AbstractPageDTO } from '@/api/core/AbstractPageDTO'

/**
 * @description 角色列表返回值
 * @param id {number} 主键 id
 * @param name {string} 角色名称
 * @param code {string} 角色编号
 */
export interface RoleListRes {
	id: number
	name?: string
	code?: string
}

/**
 * @description 分页获取角色列表请求参数
 * @param name {string} 角色名称
 * @param code {string} 橘色编码
 */
export interface RolePageReq extends AbstractPageDTO{
	name?: string
}

/**
 * @description 分页获取列表返回参数
 */
export interface RolePageRes {
	/**
	 * 主键Id
	 * @type {number}
	 * @memberof RolePageRes
	 */
	id?: number
	/**
	 * 创建时间
	 * @type {string}
	 * @memberof RolePageRes
	 */
	createdAt?: string | null
	/**
	 * 更新时间
	 * @type {string}
	 * @memberof RolePageRes
	 */
	updatedAt?: string | null
	/**
	 * 创建者Id
	 * @type {number}
	 * @memberof RolePageRes
	 */
	createdBy?: number | null
	/**
	 * 创建者姓名
	 * @type {string}
	 * @memberof RolePageRes
	 */
	createdByName?: string | null
	/**
	 * 软删除
	 * @type {boolean}
	 * @memberof RolePageRes
	 */
	isDelete?: boolean
	/**
	 * 名称
	 * @type {string}
	 * @memberof RolePageRes
	 */
	name?: string | null
	/**
	 * 排序
	 * @type {number}
	 * @memberof RolePageRes
	 */
	sort?: number
	/**
	 * 数据范围（1全部数据 2本部门及以下数据 3本部门数据 4仅本人数据 5自定义数据）
	 * @type {number}
	 * @memberof RolePageRes
	 */
	dataScope?: number
	/**
	 * 备注
	 * @type {string}
	 * @memberof RolePageRes
	 */
	description?: string | null
	/**
	 * 状态
	 * @type {number}
	 * @memberof RolePageRes
	 */
	status?: number
	/**
	 * 菜单Id集合
	 * @type {Array<number>}
	 * @memberof RoleEditReq
	 */
	menuIdList?: Array<number> | null
}

/**
 * @description 编辑角色请求参数
 */
export interface RoleEditReq {
	/**
	 * 名称
	 * @type {string}
	 * @memberof RoleEditReq
	 */
	name: string | null
	/**
	 * 编码
	 * @type {string}
	 * @memberof RoleEditReq
	 */
	code?: string | null
	/**
	 * 排序
	 * @type {number}
	 * @memberof RoleEditReq
	 */
	orderNo?: number
	/**
	 * 数据范围（1全部数据 2本部门及以下数据 3本部门数据 4仅本人数据 5自定义数据）
	 * @type {number}
	 * @memberof RoleEditReq
	 */
	dataScope?: number
	/**
	 * 备注
	 * @type {string}
	 * @memberof RoleEditReq
	 */
	remark?: string | null
	/**
	 * 状态
	 * @type {number}
	 * @memberof RoleEditReq
	 */
	status?: number
	/**
	 * 租户Id
	 * @type {number}
	 * @memberof RoleEditReq
	 */
	tenantId?: number | null
	/**
	 * 创建时间
	 * @type {string}
	 * @memberof RoleEditReq
	 */
	createTime?: string | null
	/**
	 * 更新时间
	 * @type {string}
	 * @memberof RoleEditReq
	 */
	updateTime?: string | null
	/**
	 * 创建者Id
	 * @type {number}
	 * @memberof RoleEditReq
	 */
	createUserId?: number | null
	/**
	 * 创建者姓名
	 * @type {string}
	 * @memberof RoleEditReq
	 */
	createUserName?: string | null
	/**
	 * 修改者Id
	 * @type {number}
	 * @memberof RoleEditReq
	 */
	updateUserId?: number | null
	/**
	 * 修改者姓名
	 * @type {string}
	 * @memberof RoleEditReq
	 */
	updateUserName?: string | null
	/**
	 * 软删除
	 * @type {boolean}
	 * @memberof RoleEditReq
	 */
	isDelete?: boolean
	/**
	 * 主键Id
	 * @type {number}
	 * @memberof RoleEditReq
	 */
	id?: number
	/**
	 * 菜单Id集合
	 * @type {Array<number>}
	 * @memberof RoleEditReq
	 */
	menuIdList?: Array<number> | null
}
