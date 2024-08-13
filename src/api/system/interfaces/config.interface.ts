/**
 * @description 系统配置分页请求参数
 */
export interface ConfigPageReq {
	/**
	 * 编码
	 */
	code?: string | null
	/**
	 * 名称
	 */
	name?: string | null
}

/**
 * @description 系统配置分页返回参数
 */
export interface ConfigPageRes {
	/**
	 * 编码
	 */
	code?: null | string
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
	 * 分组编码
	 */
	groupCode?: null | string
	/**
	 * 主键Id
	 */
	id?: number
	/**
	 * 软删除
	 */
	isDelete?: boolean
	/**
	 * 名称
	 */
	name?: null | string
	/**
	 * 排序
	 */
	orderNo?: number
	/**
	 * 备注
	 */
	remark?: string
	/**
	 * 是否是内置参数（Y-是，N-否）
	 */
	sysFlag?: number
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
	/**
	 * 属性值
	 */
	value?: null | string
}

/**
 * @description 系统配置编辑请求参数
 */
export interface ConfigEditReq {
	/**
	 * 编码
	 */
	code?: null | string
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
	 * 分组编码
	 */
	groupCode?: null | string
	/**
	 * 主键Id
	 */
	id?: number
	/**
	 * 软删除
	 */
	isDelete?: boolean
	/**
	 * 名称
	 */
	name?: null | string
	/**
	 * 排序
	 */
	orderNo?: number
	/**
	 * 备注
	 */
	remark?: null | string
	/**
	 * 是否是内置参数（Y-是，N-否）
	 */
	sysFlag?: number
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
	/**
	 * 属性值
	 */
	value?: null | string
}
