/**
 * @description 设备维保项分页请求参数
 */
export interface EquipmentMaintenanceItemPageReq {}

/**
 * @description 设备维保项分页返回参数
 */
export interface EquipmentMaintenanceItemPageRes {
	/**
	 * 主键Id
	 */
	id: number

	/**
	 * 租户Id
	 */
	tenantId?: number

	/**
	 * 维保项名称
	 */
	name: string

	/**
	 * 维保项单位
	 */
	unit?: string

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
	 * 设备维保项详情列表
	 */
	detailList?: EquipmentMaintenanceItemDetailListRes[] | null
}

/**
 * @description 设备维保项修改请求参数
 */
export interface EquipmentMaintenanceItemEditReq {
	/**
	 * 主键Id
	 */
	id: number

	/**
	 * 租户Id
	 */
	tenantId?: number

	/**
	 * 维保项名称
	 */
	name: string

	/**
	 * 维保项单位
	 */
	unit?: string

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
 * @description 设备维保项详情输出参数
 */
export interface EquipmentMaintenanceItemDetailListRes {
	/**
	 * 详情名称
	 */
	detailName?: null | string
	/**
	 * 维保项 id
	 */
	equipmentMaintenanceItemId?: number
	/**
	 * 主键 id
	 */
	id?: number
	/**
	 * 描述
	 */
	remark?: null | string
}
