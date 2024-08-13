/**
 * @description 设备类别分页请求参数
 */
export interface EquipmentCategoryPageReq {}

/**
 * @description 设备类别分页返回参数
 */
export interface EquipmentCategoryPageRes {
	/**
	 * 主键Id
	 */
	id: number

	/**
	 * 租户Id
	 */
	tenantId?: number

	/**
	 * 类别编码
	 */
	code?: string

	/**
	 * 类别名称
	 */
	name?: string

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
	 * 设备类型Id
	 */
	equipmentTypeId?: number

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
 * @description 设备类别修改请求参数
 */
export interface EquipmentCategoryEditReq {
	/**
	 * 主键Id
	 */
	id: number

	/**
	 * 租户Id
	 */
	tenantId?: number

	/**
	 * 类别编码
	 */
	code?: string

	/**
	 * 类别名称
	 */
	name?: string

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
	 * 设备类型Id
	 */
	equipmentTypeId?: number

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
 * @description 设备类别列表返回参数
 */
export interface EquipmentCategoryListRes {
	/**
	 * 主键Id
	 */
	id: number

	/**
	 * 租户Id
	 */
	tenantId?: number

	/**
	 * 类别编码
	 */
	code?: string

	/**
	 * 类别名称
	 */
	name?: string

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
	 * 设备类型Id
	 */
	equipmentTypeId?: number

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
