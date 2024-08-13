/**
 * @description 监控现场类别分页请求参数
 */
export interface MonitorSiteTypePageReq {}

/**
 * @description 监控现场类别分页返回参数
 */
export interface MonitorSiteTypePageRes {
	/**
	* 主键Id
	*/
	id: number
	
	/**
	* 租户Id
	*/
	tenantId?: number
	
	/**
	* 创建者部门名称
	*/
	createOrgName?: string
	
	/**
	* 监控现场类型 1：站点 2：企业 3：污水厂 4：管线  5：管点  6：排口
	*/
	monitorSiteType?: number
	
	/**
	* 类型名称
	*/
	name?: string
	
	/**
	* 状态
	*/
	status: number
	
	/**
	* 排序
	*/
	sort: number
	
	/**
	* 备注
	*/
	remark?: string
	
	/**
	* 图标路径
	*/
	imgUrl?: string
	
	/**
	* 创建者部门Id
	*/
	createOrgId?: number
	
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
 * @description 监控现场类别修改请求参数
 */
export interface MonitorSiteTypeEditReq {
	/**
	* 主键Id
	*/
	id: number
	
	/**
	* 租户Id
	*/
	tenantId?: number
	
	/**
	* 创建者部门名称
	*/
	createOrgName?: string
	
	/**
	* 监控现场类型 1：站点 2：企业 3：污水厂 4：管线  5：管点  6：排口
	*/
	monitorSiteType?: number
	
	/**
	* 类型名称
	*/
	name?: string
	
	/**
	* 状态
	*/
	status: number
	
	/**
	* 排序
	*/
	sort: number
	
	/**
	* 备注
	*/
	remark?: string
	
	/**
	* 图标路径
	*/
	imgUrl?: string
	
	/**
	* 创建者部门Id
	*/
	createOrgId?: number
	
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
