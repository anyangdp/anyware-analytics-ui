/**
 * @description App 版本发布记录分页请求参数
 */
export interface AppReleaseRecordPageReq {
	/**
	 * app 类型
	 */
	appType?: null | string
}

/**
 * @description App 版本发布记录分页返回参数
 */
export interface AppReleaseRecordPageRes {
	/**
	 * App类型 1：Android 2：IOS
	 */
	appType?: string
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
	 * 下载地址
	 */
	downloadUrl?: null | string
	/**
	 * 主键Id
	 */
	id?: number
	/**
	 * 软删除
	 */
	isDelete?: boolean
	/**
	 * 发布时间
	 */
	publishTime?: string
	/**
	 * 排序
	 */
	sort?: number
	/**
	 * 状态
	 */
	status?: number
	/**
	 * 租户Id
	 */
	tenantId?: number | null
	/**
	 * 更新内容
	 */
	updateMessage?: null | string
	/**
	 * 更新时间
	 */
	updateTime?: string | null
	/**
	 * 更新类型 1：选择更新 2：强制更新
	 */
	updateType?: string
	/**
	 * 修改者Id
	 */
	updateUserId?: number | null
	/**
	 * 修改者姓名
	 */
	updateUserName?: null | string
	/**
	 * 版本号
	 */
	versionCode?: null | string
	/**
	 * 版本状态 1：未发布，2：已发布
	 */
	versionStatus?: string
}

/**
 * @description App 版本发布记录修改请求参数
 */
export interface AppReleaseRecordEditReq {
	/**
	 * App类型 1：Android 2：IOS
	 */
	appType?: null | string
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
	 * 下载地址
	 */
	downloadUrl?: null | string
	/**
	 * 主键Id
	 */
	id?: number
	/**
	 * 软删除
	 */
	isDelete?: boolean
	/**
	 * 发布时间
	 */
	publishTime?: string | null
	/**
	 * 排序
	 */
	sort?: number
	/**
	 * 状态
	 */
	status?: number
	/**
	 * 租户Id
	 */
	tenantId?: number | null
	/**
	 * 更新内容
	 */
	updateMessage?: null | string
	/**
	 * 更新时间
	 */
	updateTime?: string | null
	/**
	 * 更新类型 1：选择更新 2：强制更新
	 */
	updateType?: null | string
	/**
	 * 修改者Id
	 */
	updateUserId?: number | null
	/**
	 * 修改者姓名
	 */
	updateUserName?: null | string
	/**
	 * 版本号
	 */
	versionCode?: null | string
	/**
	 * 版本状态 1：未发布，2：已发布
	 */
	versionStatus?: null | string
}
