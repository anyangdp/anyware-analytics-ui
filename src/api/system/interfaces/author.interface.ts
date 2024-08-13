/**
 * @description 登录接口参数类型
 */
export interface LoginReq {
	/**
	 * 账号
	 */
	account: string
	/**
	 * 密码
	 */
	password: string
	/**
	 * 验证码
	 */
	code: string
}

/**
 * @description 登录接口返回参数
 */
export interface LoginRes {
	/**
	 * token
	 */
	accessToken: string
	/**
	 * token过期时间
	 */
	accessTokenExpires: string
	/**
	 * 刷新 token
	 */
	refreshToken: string
	/**
	 * 当前用户 id
	 */
	userId: number
}

/**
 * @description 获取验证码返回接口
 */
export interface CaptchaRes {
	/**
	 * id
	 */
	id: string
	/**
	 * 图片
	 */
	img: string
}

/**
 * @description 当前登录用户信息
 */
export interface CurrentUserInfoRes {
	/**
	 * 用户 id
	 */
	id: number
	/**
	 * 账号名称
	 */
	account?: string | null
	/**
	 * 真实姓名
	 */
	realName?: string | null
	/**
	 * 账号类型
	 */
	accountType?: number | null
	/**
	 * 头像
	 */
	avatar?: string | null
	/**
	 * 个人简介
	 */
	introduction?: string | null
	/**
	 * 地址
	 */
	address?: string | null
	/**
	 * 电子签名
	 */
	signature?: string | null
	/**
	 * 机构Id
	 */
	orgId?: number | null
	/**
	 * 机构名称
	 */
	orgName?: string | null
	/**
	 * 机构类型
	 */
	orgType?: string | null
	/**
	 * 职位名称
	 */
	posName?: string | null
	/**
	 * 按钮权限集合
	 */
	buttons?: Array<string> | null
	/**
	 * 菜单集合
	 */
	menuTrees?: Array<AuthorMenuTree> | null
}

/**
 * @description 菜单
 */
export interface AuthorMenuTree {
	/**
	 * Id
	 */
	id: number
	/**
	 * 父Id
	 */
	pid?: number | null
	/**
	 * 菜单类型（0目录 1菜单 2按钮）
	 */
	type: number | null
	/**
	 * 名称
	 */
	name: string | null
	/**
	 * 路由地址
	 */
	path?: string
	/**
	 * 组件路径
	 */
	component?: string | null
	/**
	 * 权限标识
	 */
	permission?: string | null
	/**
	 * 重定向
	 */
	redirect?: string | null
	/**
	 * 排序
	 */
	orderNo?: number
	/**
	 * 状态
	 */
	status?: number | null
	/**
	 * 备注
	 */
	remark?: string | null
	/**
	 * 创建时间
	 */
	createTime?: string
	/**
	 * 更新时间
	 */
	updateTime?: string
	/**
	 * 创建者姓名
	 */
	createUserName?: string | null
	/**
	 * 修改者姓名
	 */
	updateUserName?: string | null
	/**
	 * 菜单Meta
	 */
	meta?: AuthorMenuMeta
	/**
	 * 菜单子项
	 */
	children?: Array<AuthorMenuTree> | null
}

/**
 * @description 菜单 Meta 配置
 */
export interface AuthorMenuMeta {
	/**
	 * 标题
	 */
	title?: string | null
	/**
	 * 图标
	 */
	icon?: string | null
	/**
	 * 是否内嵌
	 */
	isIframe?: boolean
	/**
	 * 外链链接
	 */
	isLink?: string | null
	/**
	 * 是否隐藏
	 */
	isHide?: boolean
	/**
	 * 是否缓存
	 */
	isKeepAlive?: boolean
	/**
	 * 是否固定
	 */
	isAffix?: boolean
}
