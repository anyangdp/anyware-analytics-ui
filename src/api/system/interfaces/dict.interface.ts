/**
 * @description 全部字典接口
 */
export interface AllListDictRes {
	/**
	 * 字典类型
	 * @type {string}
	 * @memberof AllListDictRes
	 */
	typeCode?: string | null
	/**
	 * 字典值编号
	 * @type {string}
	 * @memberof AllListDictRes
	 */
	code: string
	/**
	 * 字典值名称
	 * @type {string}
	 * @memberof AllListDictRes
	 */
	name: string
	/**
	 * 排序字段
	 * @type {string}
	 * @memberof AllListDictRes
	 */
	orderNo?: number | null
	/**
	 * 备注
	 * @type {string}
	 * @memberof AllListDictRes
	 */
	remark?: string | null
	/**
	 * tag 类型
	 * @type {string}
	 * @memberof AllListDictRes
	 */
	tagType?: string | null
	/**
	 * tag 字典值
	 * @type {string}
	 * @memberof AllListDictRes
	 */
	value?: string | null
}

/**
 * @description 分页获取字典类型请求参数
 */
export interface DictTypePageReq {
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
 * @description 分页获取字典类型返回参数
 */
export interface DictTypePageRes {
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
	 * 状态
	 */
	status?: number
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
 * @description 字典类型修改请求参数
 */
export interface DictTypeEditReq {
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
	 * 状态
	 */
	status?: number
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
 * @description 分页获取字典值请求参数
 */
export interface DictDataPageReq {
	/**
	 * 编码
	 */
	code: string
	/**
	 * 字典类型Id
	 */
	dictTypeId: number
	/**
	 * 值
	 */
	value: string
}

/**
 * @description 分页获取字典值返回参数
 */
export interface DictDataPageRes {
	/**
	 * 显示样式-Class(控制显示样式)
	 */
	classSetting?: null | string
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
	 * 字典类型Id
	 */
	dictTypeId?: number
	/**
	 * 拓展数据(保存业务功能的配置项)
	 */
	extData?: null | string
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
	 * 状态
	 */
	status?: number
	/**
	 * 显示样式-Style(控制显示样式)
	 */
	styleSetting?: null | string
	/**
	 * 显示样式-标签颜色
	 */
	tagType?: string
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
	 * 值
	 */
	value?: null | string
}

/**
 * @description 字典值修改请求参数
 */
export interface DictDataEditReq {
	/**
	 * 显示样式-Class(控制显示样式)
	 */
	classSetting?: null | string
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
	 * 字典类型Id
	 */
	dictTypeId?: number
	/**
	 * 拓展数据(保存业务功能的配置项)
	 */
	extData?: null | string
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
	 * 状态
	 */
	status?: number
	/**
	 * 显示样式-Style(控制显示样式)
	 */
	styleSetting?: null | string
	/**
	 * 显示样式-标签颜色
	 */
	tagType?: null | string
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
	 * 值
	 */
	value?: null | string
}
