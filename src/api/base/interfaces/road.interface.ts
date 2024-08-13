/**
 * @description 道路资料分页请求参数
 */
export interface RoadPageReq {
	/**
	 * 名称
	 */
	name?: null | string
}

/**
 * @description 道路资料分页返回参数
 */
export interface RoadPageRes {
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
	 * 字典乡镇编号
	 */
	dicTownshipCode?: string
	/**
	 * 主键Id
	 */
	id?: number
	/**
	 * 软删除
	 */
	isDelete?: boolean
	/**
	 * 维度
	 */
	latitude?: null | string
	/**
	 * 经度
	 */
	longitude?: null | string
	/**
	 * 道路名称
	 */
	name?: null | string
	/**
	 * 描述
	 */
	remark?: null | string
	/**
	 * 道路编号
	 */
	roadCode?: null | string
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
 * @description 道路资料修改请求参数
 */
export interface RoadEditReq {
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
	 * 字典乡镇编号
	 */
	dicTownshipCode?: null | string
	/**
	 * 主键Id
	 */
	id?: number
	/**
	 * 软删除
	 */
	isDelete?: boolean
	/**
	 * 维度
	 */
	latitude?: null | string
	/**
	 * 经度
	 */
	longitude?: null | string
	/**
	 * 道路名称
	 */
	name?: null | string
	/**
	 * 描述
	 */
	remark?: null | string
	/**
	 * 道路编号
	 */
	roadCode?: null | string
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
