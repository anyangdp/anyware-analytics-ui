/**
 * @description 排放指标模板分页请求参数
 */
export interface EmissionTemplatePageReq {}

/**
 * @description 排放指标模板分页返回参数
 */
export interface EmissionTemplatePageRes {
	/**
	 * 主键Id
	 */
	id: number

	/**
	 * 租户Id
	 */
	tenantId?: number

	/**
	 * 模板名称
	 */
	name?: string

	/**
	 * 业务类型  1：站点 2：企业 3：污水厂 4：管线  5：管点  6：排口
	 */
	busType: number

	/**
	 * 状态
	 */
	status: number

	/**
	 * 排序
	 */
	sort: number

	/**
	 * 描述
	 */
	remark?: string

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
	 * 指标明细列表
	 */
	emissionDetailList?: EmissionTemplateDetailRes[] | null
}

/**
 * @description 排放指标模板修改请求参数
 */
export interface EmissionTemplateEditReq {
	/**
	 * 主键Id
	 */
	id: number

	/**
	 * 租户Id
	 */
	tenantId?: number

	/**
	 * 模板名称
	 */
	name?: string

	/**
	 * 业务类型  1：站点 2：企业 3：污水厂 4：管线  5：管点  6：排口
	 */
	busType: number

	/**
	 * 状态
	 */
	status: number

	/**
	 * 排序
	 */
	sort: number

	/**
	 * 描述
	 */
	remark?: string

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
 * @description 排放指标模板详情输出参数
 */
export interface EmissionTemplateDetailRes {
	/**
	 * 小数位数
	 */
	decimalDigit?: number | null
	/**
	 * 指标 id
	 */
	emissionIndicatorsId?: number
	/**
	 * 指标名称
	 */
	emissionIndicatorsName?: null | string
	/**
	 * 指标单位
	 */
	emissionIndicatorsUnit?: null | string
	/**
	 * 模板 id
	 */
	emissionTemplateId?: number
	/**
	 * 主键 id
	 */
	id?: number
	/**
	 * 报警下限值
	 */
	lowerConcentration?: number | null
	/**
	 * 预警下限值
	 */
	lowerWarning?: number | null
	/**
	 * 报警上限值
	 */
	upperConcentration?: number | null
	/**
	 * 预警上限值
	 */
	upperWarning?: number | null
}
