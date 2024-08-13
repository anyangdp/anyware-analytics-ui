/**
 * @description 机构树形列表请求参数
 * @param id {number} 主机构 id
 * @param name {string} 机构名称
 * @param code {string} 机构编号
 * @param type {string} 机构类型
 */
export interface OrgTreeListReq {
	id: number
	name?: string
	code?: string
	type?: string
}

/**
 * @description 机构树形列表返回参数
 */
export interface OrgTreeListRes {
	/**
	 * 主键Id
	 * @type {number}
	 * @memberof OrgTreeListRes
	 */
	id?: number
	/**
	 * 租户Id
	 * @type {number}
	 * @memberof OrgTreeListRes
	 */
	tenantId?: number | null
	/**
	 * 创建时间
	 * @type {string}
	 * @memberof OrgTreeListRes
	 */
	createTime?: string | null
	/**
	 * 更新时间
	 * @type {string}
	 * @memberof OrgTreeListRes
	 */
	updateTime?: string | null
	/**
	 * 创建者Id
	 * @type {number}
	 * @memberof OrgTreeListRes
	 */
	createUserId?: number | null
	/**
	 * 创建者姓名
	 * @type {string}
	 * @memberof OrgTreeListRes
	 */
	createUserName?: string | null
	/**
	 * 修改者Id
	 * @type {number}
	 * @memberof OrgTreeListRes
	 */
	updateUserId?: number | null
	/**
	 * 修改者姓名
	 * @type {string}
	 * @memberof OrgTreeListRes
	 */
	updateUserName?: string | null
	/**
	 * 软删除
	 * @type {boolean}
	 * @memberof OrgTreeListRes
	 */
	isDelete?: boolean
	/**
	 * 父Id
	 * @type {number}
	 * @memberof OrgTreeListRes
	 */
	pid?: number
	/**
	 * 名称
	 * @type {string}
	 * @memberof OrgTreeListRes
	 */
	name?: string | null
	/**
	 * 编码
	 * @type {string}
	 * @memberof OrgTreeListRes
	 */
	code?: string | null
	/**
	 * 级别
	 * @type {number}
	 * @memberof OrgTreeListRes
	 */
	level?: number | undefined
	/**
	 * 机构类型-数据字典
	 * @type {string}
	 * @memberof OrgTreeListRes
	 */
	type?: string | undefined
	/**
	 * 负责人Id
	 * @type {number}
	 * @memberof OrgTreeListRes
	 */
	directorId?: number | null
	/**
	 * 排序
	 * @type {number}
	 * @memberof OrgTreeListRes
	 */
	orderNo?: number
	/**
	 * 状态
	 * @type {object}
	 * @memberof OrgTreeListRes
	 */
	status?: number
	/**
	 * 备注
	 * @type {string}
	 * @memberof OrgTreeListRes
	 */
	remark?: string | null
	/**
	 * 机构子项
	 * @type {Array<OrgTreeListRes>}
	 * @memberof OrgTreeListRes
	 */
	children?: Array<OrgTreeListRes> | null
	/**
	 * 是否管理部门
	 * @type {number}
	 * @memberof OrgTreeListRes
	 */
	isManage?: number
	/**
	 * 是否执行部门
	 * @type {number}
	 * @memberof OrgTreeListRes
	 */
	isExecute?: number
}

/**
 * @description 机构更改请求参数
 */
export interface OrgEditReq {
	/**
	 * 主键Id
	 * @type {number}
	 * @memberof OrgEditReq
	 */
	id?: number
	/**
	 * 父Id
	 * @type {number}
	 * @memberof OrgEditReq
	 */
	pid?: number
	/**
	 * 名称
	 * @type {string}
	 * @memberof OrgEditReq
	 */
	name?: string | null
	/**
	 * 编码
	 * @type {string}
	 * @memberof OrgEditReq
	 */
	code?: string | null
	/**
	 * 级别
	 * @type {number}
	 * @memberof OrgEditReq
	 */
	level?: number | undefined
	/**
	 * 机构类型-数据字典
	 * @type {string}
	 * @memberof OrgEditReq
	 */
	type?: string | undefined
	/**
	 * 排序
	 * @type {number}
	 * @memberof OrgEditReq
	 */
	orderNo?: number
	/**
	 * 状态
	 * @type {object}
	 * @memberof OrgEditReq
	 */
	status?: number
	/**
	 * 备注
	 * @type {string}
	 * @memberof OrgEditReq
	 */
	remark?: string | null
	/**
	 * 是否管理部门
	 * @type {number}
	 * @memberof OrgEditReq
	 */
	isManage?: number
	/**
	 * 是否执行部门
	 * @type {number}
	 * @memberof OrgEditReq
	 */
	isExecute?: number
}
