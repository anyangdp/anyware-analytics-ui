/**
 * SysLogEx，分页请求参数
 */
export interface LogExPageReq {
	startTime: string
	endTime: string
}

/**
 * SysLogEx，分页返回参数
 */
export interface LogExPageRes {
	/**
	 * 方法名称
	 */
	actionName?: null | string
	/**
	 * 浏览器
	 */
	browser?: null | string
	/**
	 * 创建时间
	 */
	createTime?: Date | null
	/**
	 * 创建者Id
	 */
	createUserId?: number | null
	/**
	 * 创建者姓名
	 */
	createUserName?: null | string
	/**
	 * 显示名称
	 */
	displayTitle?: null | string
	/**
	 * 操作用时
	 */
	elapsed?: number | null
	/**
	 * 异常信息
	 */
	exception?: null | string
	/**
	 * 模块名称
	 */
	fullName?: null | string
	/**
	 * 请求方式
	 */
	httpMethod?: null | string
	/**
	 * 主键Id
	 */
	id?: number
	/**
	 * 软删除
	 */
	isDelete?: boolean
	/**
	 * 登录地点
	 */
	location?: null | string
	/**
	 * 日志时间
	 */
	logDateTime?: Date | null
	/**
	 * 日志级别
	 */
	logLevel?: number | null
	/**
	 * 操作系统
	 */
	os?: null | string
	/**
	 * IP地址
	 */
	remoteIp?: null | string
	/**
	 * 请求参数
	 */
	requestParam?: null | string
	/**
	 * 请求地址
	 */
	requestUrl?: null | string
	/**
	 * 执行状态
	 */
	status?: null | string
	/**
	 * 租户Id
	 */
	tenantId?: number | null
	/**
	 * 线程Id
	 */
	threadId?: number | null
	/**
	 * 请求跟踪Id
	 */
	traceId?: null | string
	/**
	 * 更新时间
	 */
	updateTime?: Date | null
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
 * SysLogVis，分页请求参数
 */
export interface LogVisPageReq {
	startTime: string
	endTime: string
}

/**
 * SysLogVis，分页返回参数
 */
export interface LogVisPageRes {
	/**
	 * 方法名称
	 */
	actionName?: null | string
	/**
	 * 浏览器
	 */
	browser?: null | string
	/**
	 * 创建时间
	 */
	createTime?: Date | null
	/**
	 * 创建者Id
	 */
	createUserId?: number | null
	/**
	 * 创建者姓名
	 */
	createUserName?: null | string
	/**
	 * 显示名称
	 */
	displayTitle?: null | string
	/**
	 * 操作用时
	 */
	elapsed?: number | null
	/**
	 * 模块名称
	 */
	fullName?: null | string
	/**
	 * 主键Id
	 */
	id?: number
	/**
	 * 软删除
	 */
	isDelete?: boolean
	/**
	 * 登录地点
	 */
	location?: null | string
	/**
	 * 日志时间
	 */
	logDateTime?: Date | null
	/**
	 * 日志级别
	 */
	logLevel?: number | null
	/**
	 * 操作系统
	 */
	os?: null | string
	/**
	 * IP地址
	 */
	remoteIp?: null | string
	/**
	 * 请求参数
	 */
	requestParam?: null | string
	/**
	 * 执行状态
	 */
	status?: null | string
	/**
	 * 租户Id
	 */
	tenantId?: number | null
	/**
	 * 线程Id
	 */
	threadId?: number | null
	/**
	 * 请求跟踪Id
	 */
	traceId?: null | string
	/**
	 * 更新时间
	 */
	updateTime?: Date | null
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
 * SysLogOp，分页请求参数
 */
export interface LogOpPageReq {
	startTime: string
	endTime: string
}

/**
 * SysLogOp，分页返回参数
 */
export interface LogOpPageRes {
	/**
	 * 方法名称
	 */
	actionName?: null | string
	/**
	 * 浏览器
	 */
	browser?: null | string
	/**
	 * 创建时间
	 */
	createTime?: Date | null
	/**
	 * 创建者Id
	 */
	createUserId?: number | null
	/**
	 * 创建者姓名
	 */
	createUserName?: null | string
	/**
	 * 显示名称
	 */
	displayTitle?: null | string
	/**
	 * 操作用时
	 */
	elapsed?: number | null
	/**
	 * 异常信息
	 */
	exception?: null | string
	/**
	 * 模块名称
	 */
	fullName?: null | string
	/**
	 * 请求方式
	 */
	httpMethod?: null | string
	/**
	 * 主键Id
	 */
	id?: number
	/**
	 * 软删除
	 */
	isDelete?: boolean
	/**
	 * 登录地点
	 */
	location?: null | string
	/**
	 * 日志时间
	 */
	logDateTime?: Date | null
	/**
	 * 日志级别
	 */
	logLevel?: number | null
	/**
	 * 操作系统
	 */
	os?: null | string
	/**
	 * IP地址
	 */
	remoteIp?: null | string
	/**
	 * 请求参数
	 */
	requestParam?: null | string
	/**
	 * 请求地址
	 */
	requestUrl?: null | string
	/**
	 * 执行状态
	 */
	status?: null | string
	/**
	 * 租户Id
	 */
	tenantId?: number | null
	/**
	 * 线程Id
	 */
	threadId?: number | null
	/**
	 * 请求跟踪Id
	 */
	traceId?: null | string
	/**
	 * 更新时间
	 */
	updateTime?: Date | null
	/**
	 * 修改者Id
	 */
	updateUserId?: number | null
	/**
	 * 修改者姓名
	 */
	updateUserName?: null | string
}
