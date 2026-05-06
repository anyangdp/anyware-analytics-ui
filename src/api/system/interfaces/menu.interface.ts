import type { AbstractDTO } from '@/api/core/AbstractDTO'

/**
 * @description 列表请求参数
 * @param title {string} 菜单名称
 * @param type {number} 菜单类型（1目录 2菜单 3按钮）
 */
export interface MenuListReq {
	title?: string
	type?: number
}

/**
 * @description 列表返回参数
 */
export interface MenuListRes extends AbstractDTO{
	/**
	 * 父Id
	 * @type {number}
	 * @memberof MenuListRes
	 */
	parentId?: number
	/**
	 * 菜单类型（1目录 2菜单 3按钮）
	 * @type {object}
	 * @memberof MenuListRes
	 */
	type?: number
	/**
	 * 菜单层级
	 * @type {number}
	 * @memberof MenuListRes
	 */
	level?: number
	/**
	 * 路由名称
	 * @type {string}
	 * @memberof MenuListRes
	 */
	name?: string | null
	/**
	 * 路由地址
	 * @type {string}
	 * @memberof MenuListRes
	 */
	path?: string | null
	/**
	 * 组件路径
	 * @type {string}
	 * @memberof MenuListRes
	 */
	component?: string | null
	/**
	 * 菜单名称
	 * @type {string}
	 * @memberof MenuListRes
	 */
	title: string
	/**
	 * 图标
	 * @type {string}
	 * @memberof MenuListRes
	 */
	icon?: string
	/**
	 * 外链链接
	 * @type {string}
	 * @memberof MenuListRes
	 */
	outLink?: string | null
	/**
	 * 排序
	 * @type {number}
	 * @memberof MenuListRes
	 */
	sort?: number
	/**
	 * 状态
	 * @type {object}
	 * @memberof MenuListRes
	 */
	active?: boolean
	/**
	 * 菜单子项
	 * @type {Array<MenuListRes>}
	 * @memberof MenuListRes
	 */
	children?: Array<MenuListRes> | null
}

/**
 * @description 菜单编辑请求类
 */
export interface MenuEditReq {
	/**
	 * 创建时间
	 * @type {string}
	 * @memberof MenuEditReq
	 */
	createTime?: string | null
	/**
	 * 更新时间
	 * @type {string}
	 * @memberof MenuEditReq
	 */
	updateTime?: string | null
	/**
	 * 创建者Id
	 * @type {number}
	 * @memberof MenuEditReq
	 */
	createUserId?: number | null
	/**
	 * 创建者姓名
	 * @type {string}
	 * @memberof MenuEditReq
	 */
	createUserName?: string | null
	/**
	 * 修改者Id
	 * @type {number}
	 * @memberof MenuEditReq
	 */
	updateUserId?: number | null
	/**
	 * 修改者姓名
	 * @type {string}
	 * @memberof MenuEditReq
	 */
	updateUserName?: string | null
	/**
	 * 软删除
	 * @type {boolean}
	 * @memberof MenuEditReq
	 */
	isDelete?: boolean
	/**
	 * 主键Id
	 * @type {number}
	 * @memberof MenuEditReq
	 */
	id?: number
	/**
	 * 父Id
	 * @type {number}
	 * @memberof MenuEditReq
	 */
	pid?: number
	/**
	 * 菜单类型（1目录 2菜单 3按钮）
	 * @type {object}
	 * @memberof MenuEditReq
	 */
	type?: object
	/**
	 * 路由名称
	 * @type {string}
	 * @memberof MenuEditReq
	 */
	name?: string | null
	/**
	 * 路由地址
	 * @type {string}
	 * @memberof MenuEditReq
	 */
	path?: string | null
	/**
	 * 组件路径
	 * @type {string}
	 * @memberof MenuEditReq
	 */
	component?: string | null
	/**
	 * 重定向
	 * @type {string}
	 * @memberof MenuEditReq
	 */
	redirect?: string | null
	/**
	 * 权限标识
	 * @type {string}
	 * @memberof MenuEditReq
	 */
	permission?: string | null
	/**
	 * 菜单名称
	 * @type {string}
	 * @memberof MenuEditReq
	 */
	title: string
	/**
	 * 图标
	 * @type {string}
	 * @memberof MenuEditReq
	 */
	icon?: string | null
	/**
	 * 是否内嵌
	 * @type {boolean}
	 * @memberof MenuEditReq
	 */
	isIframe?: boolean
	/**
	 * 外链链接
	 * @type {string}
	 * @memberof MenuEditReq
	 */
	outLink?: string | null
	/**
	 * 是否隐藏
	 * @type {boolean}
	 * @memberof MenuEditReq
	 */
	isHide?: boolean
	/**
	 * 是否缓存
	 * @type {boolean}
	 * @memberof MenuEditReq
	 */
	isKeepAlive?: boolean
	/**
	 * 是否固定
	 * @type {boolean}
	 * @memberof MenuEditReq
	 */
	isAffix?: boolean
	/**
	 * 排序
	 * @type {number}
	 * @memberof MenuEditReq
	 */
	orderNo?: number
	/**
	 * 状态
	 * @type {object}
	 * @memberof MenuEditReq
	 */
	status?: number
	/**
	 * 备注
	 * @type {string}
	 * @memberof MenuEditReq
	 */
	remark?: string | null
}
