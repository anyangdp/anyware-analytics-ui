/**
 * @description 分页获取用户列表请求参数
 * @param account {string} 用户账号
 * @param realName {string} 用户真实姓名
 * @param phone {string} 用户手机号
 * @param orgId {number} 用户所属机构
 */
export interface UserPageReq {
	account?: string
	realName?: string
	phone?: string
	orgId?: number
}

/**
 * @description 分页获取用户列表返回值
 */
export interface UserPageRes {
	/**
	 * 主键Id
	 * @type {number}
	 * @memberof UserPageRes
	 */
	id?: number
	/**
	 * 租户Id
	 * @type {number}
	 * @memberof UserPageRes
	 */
	tenantId?: number | null
	/**
	 * 创建时间
	 * @type {string}
	 * @memberof UserPageRes
	 */
	createTime?: string | null
	/**
	 * 更新时间
	 * @type {string}
	 * @memberof UserPageRes
	 */
	updateTime?: string | null
	/**
	 * 创建者Id
	 * @type {number}
	 * @memberof UserPageRes
	 */
	createUserId?: number | null
	/**
	 * 创建者姓名
	 * @type {string}
	 * @memberof UserPageRes
	 */
	createUserName?: string | null
	/**
	 * 修改者Id
	 * @type {number}
	 * @memberof UserPageRes
	 */
	updateUserId?: number | null
	/**
	 * 修改者姓名
	 * @type {string}
	 * @memberof UserPageRes
	 */
	updateUserName?: string | null
	/**
	 * 软删除
	 * @type {boolean}
	 * @memberof UserPageRes
	 */
	isDelete?: boolean
	/**
	 * 账号
	 * @type {string}
	 * @memberof UserPageRes
	 */
	account?: string | null
	/**
	 * 真实姓名
	 * @type {string}
	 * @memberof UserPageRes
	 */
	realName?: string | null
	/**
	 * 昵称
	 * @type {string}
	 * @memberof UserPageRes
	 */
	nickName?: string | null
	/**
	 * 头像
	 * @type {string}
	 * @memberof UserPageRes
	 */
	avatar?: string | null
	/**
	 * 性别-男_1、女_2
	 * @type {number | null}
	 * @memberof UserPageRes
	 */
	sex?: number
	/**
	 * 年龄
	 * @type {number}
	 * @memberof UserPageRes
	 */
	age?: number
	/**
	 * 出生日期
	 * @type {string}
	 * @memberof UserPageRes
	 */
	birthday?: string
	/**
	 * 民族
	 * @type {string}
	 * @memberof UserPageRes
	 */
	nation?: string | null
	/**
	 * 手机号码
	 * @type {string}
	 * @memberof UserPageRes
	 */
	phone?: string | null
	/**
	 * 证件类型
	 * @type {number | null}
	 * @memberof UserPageRes
	 */
	cardType?: number
	/**
	 * 身份证号
	 * @type {string}
	 * @memberof UserPageRes
	 */
	idCardNum?: string | null
	/**
	 * 邮箱
	 * @type {string}
	 * @memberof UserPageRes
	 */
	email?: string | null
	/**
	 * 地址
	 * @type {string}
	 * @memberof UserPageRes
	 */
	address?: string | null
	/**
	 * 文化程度
	 * @type {number | null}
	 * @memberof UserPageRes
	 */
	cultureLevel?: number
	/**
	 * 政治面貌
	 * @type {string}
	 * @memberof UserPageRes
	 */
	politicalOutlook?: string | null
	/**
	 * 毕业院校
	 * @type {string}
	 * @memberof UserPageRes
	 */
	college?: string | null
	/**
	 * 办公电话
	 * @type {string}
	 * @memberof UserPageRes
	 */
	officePhone?: string | null
	/**
	 * 紧急联系人
	 * @type {string}
	 * @memberof UserPageRes
	 */
	emergencyContact?: string | null
	/**
	 * 紧急联系人电话
	 * @type {string}
	 * @memberof UserPageRes
	 */
	emergencyPhone?: string | null
	/**
	 * 紧急联系人地址
	 * @type {string}
	 * @memberof UserPageRes
	 */
	emergencyAddress?: string | null
	/**
	 * 个人简介
	 * @type {string}
	 * @memberof UserPageRes
	 */
	introduction?: string | null
	/**
	 * 排序
	 * @type {number}
	 * @memberof UserPageRes
	 */
	orderNo?: number
	/**
	 * 状态
	 * @type {number | null}
	 * @memberof UserPageRes
	 */
	status?: number | null
	/**
	 * 备注
	 * @type {string}
	 * @memberof UserPageRes
	 */
	remark?: string | null
	/**
	 * 账号类型
	 * @type {number | null}
	 * @memberof UserPageRes
	 */
	accountType?: number
	/**
	 * 直属机构Id
	 * @type {number}
	 * @memberof UserPageRes
	 */
	orgId?: number
	/**
	 * 直属主管Id
	 * @type {number}
	 * @memberof UserPageRes
	 */
	managerUserId?: number | null
	/**
	 * 职位Id
	 * @type {number}
	 * @memberof UserPageRes
	 */
	posId?: number
	/**
	 * 工号
	 * @type {string}
	 * @memberof UserPageRes
	 */
	jobNum?: string | null
	/**
	 * 职级
	 * @type {string}
	 * @memberof UserPageRes
	 */
	posLevel?: string | null
	/**
	 * 职称
	 * @type {string}
	 * @memberof UserPageRes
	 */
	posTitle?: string | null
	/**
	 * 擅长领域
	 * @type {string}
	 * @memberof UserPageRes
	 */
	expertise?: string | null
	/**
	 * 办公区域
	 * @type {string}
	 * @memberof UserPageRes
	 */
	officeZone?: string | null
	/**
	 * 办公室
	 * @type {string}
	 * @memberof UserPageRes
	 */
	office?: string | null
	/**
	 * 入职日期
	 * @type {string}
	 * @memberof UserPageRes
	 */
	joinDate?: string
	/**
	 * 最新登录Ip
	 * @type {string}
	 * @memberof UserPageRes
	 */
	lastLoginIp?: string | null
	/**
	 * 最新登录地点
	 * @type {string}
	 * @memberof UserPageRes
	 */
	lastLoginAddress?: string | null
	/**
	 * 最新登录时间
	 * @type {string}
	 * @memberof UserPageRes
	 */
	lastLoginTime?: string | null
	/**
	 * 最新登录设备
	 * @type {string}
	 * @memberof UserPageRes
	 */
	lastLoginDevice?: string | null
	/**
	 * 电子签名
	 * @type {string}
	 * @memberof UserPageRes
	 */
	signature?: string | null
	/**
	 * 机构名称
	 * @type {string}
	 * @memberof UserPageRes
	 */
	orgName?: string | null
	/**
	 * 职位名称
	 * @type {string}
	 * @memberof UserPageRes
	 */
	posName?: string | null
	/**
	 * 角色名称
	 * @type {string}
	 * @memberof UserPageRes
	 */
	roleName?: string | null
	/**
	 * 角色 id 合集
	 * @type {Array<number>}
	 * @memberof UserPageRes
	 */
	roleIdList?: number[]
}

/**
 * @description 用户信息
 */
export interface UserInfoRes {
	/**
	 * 主键Id
	 * @type {number}
	 * @memberof UserInfoRes
	 */
	id?: number
	/**
	 * 租户Id
	 * @type {number}
	 * @memberof UserInfoRes
	 */
	tenantId?: number | null
	/**
	 * 创建时间
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	createTime?: string | null
	/**
	 * 更新时间
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	updateTime?: string | null
	/**
	 * 创建者Id
	 * @type {number}
	 * @memberof UserInfoRes
	 */
	createUserId?: number | null
	/**
	 * 创建者姓名
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	createUserName?: string | null
	/**
	 * 修改者Id
	 * @type {number}
	 * @memberof UserInfoRes
	 */
	updateUserId?: number | null
	/**
	 * 修改者姓名
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	updateUserName?: string | null
	/**
	 * 软删除
	 * @type {boolean}
	 * @memberof UserInfoRes
	 */
	isDelete?: boolean
	/**
	 * 账号
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	account?: string | null
	/**
	 * 真实姓名
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	realName?: string | null
	/**
	 * 昵称
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	nickName?: string | null
	/**
	 * 头像
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	avatar?: string | null
	/**
	 * 性别-男_1、女_2
	 * @type {number | null}
	 * @memberof UserInfoRes
	 */
	sex?: number
	/**
	 * 年龄
	 * @type {number}
	 * @memberof UserInfoRes
	 */
	age?: number
	/**
	 * 出生日期
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	birthday?: string
	/**
	 * 民族
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	nation?: string | null
	/**
	 * 手机号码
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	phone?: string | null
	/**
	 * 证件类型
	 * @type {number | null}
	 * @memberof UserInfoRes
	 */
	cardType?: number
	/**
	 * 身份证号
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	idCardNum?: string | null
	/**
	 * 邮箱
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	email?: string | null
	/**
	 * 地址
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	address?: string | null
	/**
	 * 文化程度
	 * @type {number | null}
	 * @memberof UserInfoRes
	 */
	cultureLevel?: number
	/**
	 * 政治面貌
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	politicalOutlook?: string | null
	/**
	 * 毕业院校
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	college?: string | null
	/**
	 * 办公电话
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	officePhone?: string | null
	/**
	 * 紧急联系人
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	emergencyContact?: string | null
	/**
	 * 紧急联系人电话
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	emergencyPhone?: string | null
	/**
	 * 紧急联系人地址
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	emergencyAddress?: string | null
	/**
	 * 个人简介
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	introduction?: string | null
	/**
	 * 排序
	 * @type {number}
	 * @memberof UserInfoRes
	 */
	orderNo?: number
	/**
	 * 状态
	 * @type {number | null}
	 * @memberof UserInfoRes
	 */
	status?: number | null
	/**
	 * 备注
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	remark?: string | null
	/**
	 * 账号类型
	 * @type {number | null}
	 * @memberof UserInfoRes
	 */
	accountType?: number
	/**
	 * 直属机构Id
	 * @type {number}
	 * @memberof UserInfoRes
	 */
	orgId?: number
	/**
	 * 直属主管Id
	 * @type {number}
	 * @memberof UserInfoRes
	 */
	managerUserId?: number | null
	/**
	 * 职位Id
	 * @type {number}
	 * @memberof UserInfoRes
	 */
	posId?: number
	/**
	 * 工号
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	jobNum?: string | null
	/**
	 * 职级
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	posLevel?: string | null
	/**
	 * 职称
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	posTitle?: string | null
	/**
	 * 擅长领域
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	expertise?: string | null
	/**
	 * 办公区域
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	officeZone?: string | null
	/**
	 * 办公室
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	office?: string | null
	/**
	 * 入职日期
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	joinDate?: string
	/**
	 * 最新登录Ip
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	lastLoginIp?: string | null
	/**
	 * 最新登录地点
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	lastLoginAddress?: string | null
	/**
	 * 最新登录时间
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	lastLoginTime?: string | null
	/**
	 * 最新登录设备
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	lastLoginDevice?: string | null
	/**
	 * 电子签名
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	signature?: string | null
	/**
	 * 机构名称
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	orgName?: string | null
	/**
	 * 职位名称
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	posName?: string | null
	/**
	 * 角色名称
	 * @type {string}
	 * @memberof UserInfoRes
	 */
	roleName?: string | null
}

/**
 * @description 新增、编辑用户请求参数
 */
export interface UserEditReq {
	/**
	 * 主键Id
	 * @type {number}
	 * @memberof UserEditReq
	 */
	id?: number
	/**
	 * 租户Id
	 * @type {number}
	 * @memberof UserEditReq
	 */
	tenantId?: number | null
	/**
	 * 创建时间
	 * @type {string}
	 * @memberof UserEditReq
	 */
	createTime?: string | null
	/**
	 * 更新时间
	 * @type {string}
	 * @memberof UserEditReq
	 */
	updateTime?: string | null
	/**
	 * 创建者Id
	 * @type {number}
	 * @memberof UserEditReq
	 */
	createUserId?: number | null
	/**
	 * 创建者姓名
	 * @type {string}
	 * @memberof UserEditReq
	 */
	createUserName?: string | null
	/**
	 * 修改者Id
	 * @type {number}
	 * @memberof UserEditReq
	 */
	updateUserId?: number | null
	/**
	 * 修改者姓名
	 * @type {string}
	 * @memberof UserEditReq
	 */
	updateUserName?: string | null
	/**
	 * 软删除
	 * @type {boolean}
	 * @memberof UserEditReq
	 */
	isDelete?: boolean
	/**
	 * 账号
	 * @type {string}
	 * @memberof UserEditReq
	 */
	account?: string | null
	/**
	 * 真实姓名
	 * @type {string}
	 * @memberof UserEditReq
	 */
	realName?: string | null
	/**
	 * 昵称
	 * @type {string}
	 * @memberof UserEditReq
	 */
	nickName?: string | null
	/**
	 * 头像
	 * @type {string}
	 * @memberof UserEditReq
	 */
	avatar?: string | null
	/**
	 * 性别-男_1、女_2
	 * @type { number | null}
	 * @memberof UserEditReq
	 */
	sex?: number | null
	/**
	 * 年龄
	 * @type {number}
	 * @memberof UserEditReq
	 */
	age?: number
	/**
	 * 出生日期
	 * @type {string}
	 * @memberof UserEditReq
	 */
	birthday?: string | null
	/**
	 * 民族
	 * @type {string}
	 * @memberof UserEditReq
	 */
	nation?: string | null
	/**
	 * 手机号码
	 * @type {string}
	 * @memberof UserEditReq
	 */
	phone?: string | null
	/**
	 * 证件类型
	 * @type { number | null}
	 * @memberof UserEditReq
	 */
	cardType?: number | null
	/**
	 * 身份证号
	 * @type {string}
	 * @memberof UserEditReq
	 */
	idCardNum?: string | null
	/**
	 * 邮箱
	 * @type {string}
	 * @memberof UserEditReq
	 */
	email?: string | null
	/**
	 * 地址
	 * @type {string}
	 * @memberof UserEditReq
	 */
	address?: string | null
	/**
	 * 文化程度
	 * @type { number | null}
	 * @memberof UserEditReq
	 */
	cultureLevel?: number | null
	/**
	 * 政治面貌
	 * @type {string}
	 * @memberof UserEditReq
	 */
	politicalOutlook?: string | null
	/**
	 * 毕业院校
	 * @type {string}
	 * @memberof UserEditReq
	 */
	college?: string | null
	/**
	 * 办公电话
	 * @type {string}
	 * @memberof UserEditReq
	 */
	officePhone?: string | null
	/**
	 * 紧急联系人
	 * @type {string}
	 * @memberof UserEditReq
	 */
	emergencyContact?: string | null
	/**
	 * 紧急联系人电话
	 * @type {string}
	 * @memberof UserEditReq
	 */
	emergencyPhone?: string | null
	/**
	 * 紧急联系人地址
	 * @type {string}
	 * @memberof UserEditReq
	 */
	emergencyAddress?: string | null
	/**
	 * 个人简介
	 * @type {string}
	 * @memberof UserEditReq
	 */
	introduction?: string | null
	/**
	 * 排序
	 * @type {number}
	 * @memberof UserEditReq
	 */
	orderNo?: number
	/**
	 * 状态
	 * @type { number | null}
	 * @memberof UserEditReq
	 */
	status?: number | null
	/**
	 * 备注
	 * @type {string}
	 * @memberof UserEditReq
	 */
	remark?: string | null
	/**
	 * 账号类型
	 * @type { number | null}
	 * @memberof UserEditReq
	 */
	accountType?: number | null
	/**
	 * 直属机构Id
	 * @type {number}
	 * @memberof UserEditReq
	 */
	orgId?: number
	/**
	 * 直属主管Id
	 * @type {number}
	 * @memberof UserEditReq
	 */
	managerUserId?: number | null
	/**
	 * 职位Id
	 * @type {number}
	 * @memberof UserEditReq
	 */
	posId?: number
	/**
	 * 工号
	 * @type {string}
	 * @memberof UserEditReq
	 */
	jobNum?: string | null
	/**
	 * 职级
	 * @type {string}
	 * @memberof UserEditReq
	 */
	posLevel?: string | null
	/**
	 * 职称
	 * @type {string}
	 * @memberof UserEditReq
	 */
	posTitle?: string | null
	/**
	 * 擅长领域
	 * @type {string}
	 * @memberof UserEditReq
	 */
	expertise?: string | null
	/**
	 * 办公区域
	 * @type {string}
	 * @memberof UserEditReq
	 */
	officeZone?: string | null
	/**
	 * 办公室
	 * @type {string}
	 * @memberof UserEditReq
	 */
	office?: string | null
	/**
	 * 入职日期
	 * @type {string}
	 * @memberof UserEditReq
	 */
	joinDate?: string | null
	/**
	 * 最新登录Ip
	 * @type {string}
	 * @memberof UserEditReq
	 */
	lastLoginIp?: string | null
	/**
	 * 最新登录地点
	 * @type {string}
	 * @memberof UserEditReq
	 */
	lastLoginAddress?: string | null
	/**
	 * 最新登录时间
	 * @type {string}
	 * @memberof UserEditReq
	 */
	lastLoginTime?: string | null
	/**
	 * 最新登录设备
	 * @type {string}
	 * @memberof UserEditReq
	 */
	lastLoginDevice?: string | null
	/**
	 * 电子签名
	 * @type {string}
	 * @memberof UserEditReq
	 */
	signature?: string | null
	/**
	 * 角色集合
	 * @type {Array<number>}
	 * @memberof UserEditReq
	 */
	roleIdList?: Array<number> | null
}

/**
 * 修改用户密码输入参数
 */
export interface ChangePwdReq {
	/**
	 * 当前密码
	 * @type {string}
	 * @memberof ChangePwdReq
	 */
	passwordOld: string

	/**
	 * 新密码
	 * @type {string}
	 * @memberof ChangePwdReq
	 */
	passwordNew: string
}
