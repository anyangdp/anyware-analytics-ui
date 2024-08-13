/**
 * @description 河道资料分页请求参数
 */
export interface RiverWayPageReq {
	/**
	 * 名称
	 */
	name?: null | string
}

/**
 * @description 河道资料分页返回参数
 */
export interface RiverWayPageRes {
	/**
	 * 创建时间
	 */
	createTime?: string | null
	/**
	 * 创建者Id
	 */
	createUserId?: number | null
	/**
	 * 创建者姓名
	 */
	createUserName?: null | string
	/**
	 * 主键Id
	 */
	id?: number
	/**
	 * 软删除
	 */
	isDelete?: boolean
	/**
	 * 河道名称
	 */
	name?: null | string
	/**
	 * 描述
	 */
	remark?: null | string
	/**
	 * 排序
	 */
	sort?: number
	/**
	 * 状态
	 */
	status?: number
	/**
	 * 租户Id
	 */
	tenantId?: number | null
	/**
	 * 更新时间
	 */
	updateTime?: string | null
	/**
	 * 修改者Id
	 */
	updateUserId?: number | null
	/**
	 * 修改者姓名
	 */
	updateUserName?: null | string
}

/**
 * @description 河道资料修改请求参数
 */
export interface RiverWayEditReq {
	/**
	 * 创建时间
	 */
	createTime?: string | null
	/**
	 * 创建者Id
	 */
	createUserId?: number | null
	/**
	 * 创建者姓名
	 */
	createUserName?: null | string
	/**
	 * 主键Id
	 */
	id?: number
	/**
	 * 软删除
	 */
	isDelete?: boolean
	/**
	 * 河道名称
	 */
	name?: null | string
	/**
	 * 描述
	 */
	remark?: null | string
	/**
	 * 排序
	 */
	sort?: number
	/**
	 * 状态
	 */
	status?: number
	/**
	 * 租户Id
	 */
	tenantId?: number | null
	/**
	 * 更新时间
	 */
	updateTime?: string | null
	/**
	 * 修改者Id
	 */
	updateUserId?: number | null
	/**
	 * 修改者姓名
	 */
	updateUserName?: null | string
}
