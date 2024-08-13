/**
 * @description 运维单位分页请求参数
 */
export interface OperationUnitPageReq {}

/**
 * @description 运维单位分页返回参数
 */
export interface OperationUnitPageRes {
	/**
	 * 主键Id
	 */
	id: number

	/**
	 * 租户Id
	 */
	tenantId?: number

	/**
	 * 运维单位名称
	 */
	name?: string

	/**
	 * 关联站点的数量
	 */
	relationSiteNumber: number

	/**
	 * 备注
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
	 * 运维单位简称
	 */
	shortName?: string

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
 * @description 运维单位修改请求参数
 */
export interface OperationUnitEditReq {
	/**
	 * 主键Id
	 */
	id: number

	/**
	 * 租户Id
	 */
	tenantId?: number

	/**
	 * 运维单位名称
	 */
	name?: string

	/**
	 * 备注
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
	 * 运维单位简称
	 */
	shortName?: string

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
 * @description 运维单位关联监测现场请求参数
 */
export interface RelationListReq {
	/**
	 * 运维单位 id
	 */
	id: number
	/**
	 * 监测现场名称
	 */
	name?: null | string
}

/**
 * @description 运维单位已关联监测现场列表返回参数
 */
export interface RelationListRes {
	/**
	 * 主键 id
	 */
	id?: number
	/**
	 * 运维单位 id
	 */
	operationUnitId?: number
	/**
	 * 监测现场 id
	 */
	siteId?: number
	/**
	 * 监测现场名称
	 */
	siteName?: null | string
	/**
	 * 监测点所属乡镇Code
	 */
	siteTownshipCode?: null | string
	/**
	 * 监测现场乡镇名称
	 */
	siteTownShipName?: null | string
}

/**
 * @description 运维单位未关联监测现场请求参数
 */
export interface UnRelationListReq {
	/**
	 * 运维单位 id
	 */
	id: number
	/**
	 * 监测现场名称
	 */
	name?: null | string
}

/**
 * @description 运维单位未关联监测现场列表返回参数
 */
export interface UnRelationListRes {
	/**
	 * 主键 id
	 */
	id?: number
	/**
	 * 运维单位 id
	 */
	operationUnitId?: number
	/**
	 * 监测现场 id
	 */
	siteId?: number
	/**
	 * 监测现场名称
	 */
	siteName?: null | string
	/**
	 * 监测点所属乡镇Code
	 */
	siteTownshipCode?: null | string
	/**
	 * 监测现场乡镇名称
	 */
	siteTownShipName?: null | string
}

/**
 * @description 运维单位关联监测现场请求参数
 */
export interface RelationSiteReq {
	/**
	 * 运维单位 id
	 */
	operationUnitId: number
	/**
	 * 监测现场 id 集合
	 */
	siteIds: (number | undefined)[]
}

/**
 * @description 运维单位取消关联监测现场请求参数
 */
export interface UnRelationSiteReq {
	/**
	 * 主键 id 集合
	 */
	ids: (number | undefined)[]
}
