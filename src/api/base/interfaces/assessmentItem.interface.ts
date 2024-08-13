/**
 * @description 考核规则分页请求参数
 */
export interface AssessmentItemPageReq {
	/**
	 * 名称
	 */
	name?: null | string
}

/**
 * @description 考核规则分页返回参数
 */
export interface AssessmentItemPageRes {
	/**
	 * 考核描述
	 */
	assessmentDescription?: null | string
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
	 * 满分分值
	 */
	fullScore?: number
	/**
	 * 主键Id
	 */
	id?: number
	/**
	 * 软删除
	 */
	isDelete?: boolean
	/**
	 * 考核项目名称
	 */
	name?: null | string
	/**
	 * 备注
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
 * @description 考核规则修改请求参数
 */
export interface AssessmentItemEditReq {
	/**
	 * 考核描述
	 */
	assessmentDescription?: null | string
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
	 * 满分分值
	 */
	fullScore?: number | null
	/**
	 * 主键Id
	 */
	id?: number
	/**
	 * 软删除
	 */
	isDelete?: boolean
	/**
	 * 考核项目名称
	 */
	name?: null | string
	/**
	 * 备注
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
