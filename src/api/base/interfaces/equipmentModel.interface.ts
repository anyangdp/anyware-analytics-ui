/**
 * @description 设备规格型号分页请求参数
 */
export interface EquipmentModelPageReq {}

/**
 * @description 设备规格型号分页返回参数
 */
export interface EquipmentModelPageRes {
	/**
	* 主键Id
	*/
	id: number
	
	/**
	* 租户Id
	*/
	tenantId?: number
	
	/**
	* 设备类别 id
	*/
	equipmentCategoryId: number
	
	/**
	* 设备品牌 id
	*/
	equipmentBrandId: number
	
	/**
	* 设备功率（KW）
	*/
	power?: number
	
	/**
	* 规格型号
	*/
	specification?: string
	
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
 * @description 设备规格型号修改请求参数
 */
export interface EquipmentModelEditReq {
	/**
	* 主键Id
	*/
	id: number
	
	/**
	* 租户Id
	*/
	tenantId?: number
	
	/**
	* 设备类别 id
	*/
	equipmentCategoryId: number
	
	/**
	* 设备品牌 id
	*/
	equipmentBrandId: number
	
	/**
	* 设备功率（KW）
	*/
	power?: number
	
	/**
	* 规格型号
	*/
	specification?: string
	
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
