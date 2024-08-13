/**
 * @description 排放指标分页请求参数
 */
export interface EmissionIndicatorsPageReq {}

/**
 * @description 排放指标分页返回参数
 */
export interface EmissionIndicatorsPageRes {
	/**
	 * 主键Id
	 */
	id: number

	/**
	 * 租户Id
	 */
	tenantId?: number

	/**
	 * 指标名称
	 */
	name?: string

	/**
	 * 单位
	 */
	unit?: string

	/**
	 * 描述
	 */
	remark?: string

	/**
	 * 状态
	 */
	status: number

	/**
	 * 排序
	 */
	sort: number

	/**
	 * 创建者部门Id
	 */
	createOrgId?: number

	/**
	 * 创建者部门名称
	 */
	createOrgName?: string

	/**
	 * 创建时间
	 */
	createTime?: string

	/**
	 * 更新时间
	 */
	updateTime?: string

	/**
	 * 创建者Id
	 */
	createUserId?: number

	/**
	 * 创建者姓名
	 */
	createUserName?: string

	/**
	 * 修改者Id
	 */
	updateUserId?: number

	/**
	 * 修改者姓名
	 */
	updateUserName?: string

	/**
	 * 软删除
	 */
	isDelete: boolean
	/**
	 * 排放指标检测方式列表
	 */
	emissionMethodList?: EmissionMethodListRes[] | null
}

/**
 * @description 排放指标修改请求参数
 */
export interface EmissionIndicatorsEditReq {
	/**
	 * 主键Id
	 */
	id: number

	/**
	 * 租户Id
	 */
	tenantId?: number

	/**
	 * 指标名称
	 */
	name?: string

	/**
	 * 单位
	 */
	unit?: string

	/**
	 * 描述
	 */
	remark?: string

	/**
	 * 状态
	 */
	status: number

	/**
	 * 排序
	 */
	sort: number

	/**
	 * 创建者部门Id
	 */
	createOrgId?: number

	/**
	 * 创建者部门名称
	 */
	createOrgName?: string

	/**
	 * 创建时间
	 */
	createTime?: string

	/**
	 * 更新时间
	 */
	updateTime?: string

	/**
	 * 创建者Id
	 */
	createUserId?: number

	/**
	 * 创建者姓名
	 */
	createUserName?: string

	/**
	 * 修改者Id
	 */
	updateUserId?: number

	/**
	 * 修改者姓名
	 */
	updateUserName?: string

	/**
	 * 软删除
	 */
	isDelete: boolean
}

/**
 * @description 排放指标列表返回参数
 */
export interface EmissionIndicatorsListRes {
	/**
	 * 主键Id
	 */
	id: number

	/**
	 * 租户Id
	 */
	tenantId?: number

	/**
	 * 指标名称
	 */
	name?: string

	/**
	 * 单位
	 */
	unit?: string

	/**
	 * 描述
	 */
	remark?: string

	/**
	 * 状态
	 */
	status: number

	/**
	 * 排序
	 */
	sort: number

	/**
	 * 创建者部门Id
	 */
	createOrgId?: number

	/**
	 * 创建者部门名称
	 */
	createOrgName?: string

	/**
	 * 创建时间
	 */
	createTime?: string

	/**
	 * 更新时间
	 */
	updateTime?: string

	/**
	 * 创建者Id
	 */
	createUserId?: number

	/**
	 * 创建者姓名
	 */
	createUserName?: string

	/**
	 * 修改者Id
	 */
	updateUserId?: number

	/**
	 * 修改者姓名
	 */
	updateUserName?: string

	/**
	 * 软删除
	 */
	isDelete: boolean
}

/**
 * @description 指标检测方式输出参数
 */
export interface EmissionMethodListRes {
	/**
	 * 排放指标 id
	 */
	emissionIndicatorsId?: number
	/**
	 * 主键 id
	 */
	id?: number
	/**
	 * 标准来源
	 */
	standardSources?: null | string
	/**
	 * 检测方法
	 */
	testMethod?: null | string
}
