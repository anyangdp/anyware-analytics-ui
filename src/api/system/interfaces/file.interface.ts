/**
 * @description 上传头像输出
 */
export interface UploadAvatarRes {
	/**
	 * 主键Id
	 * @type {number}
	 * @memberof UploadAvatarRes
	 */
	id?: number
	/**
	 * 创建时间
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	createTime?: string | null
	/**
	 * 更新时间
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	updateTime?: string | null
	/**
	 * 创建者Id
	 * @type {number}
	 * @memberof UploadAvatarRes
	 */
	createUserId?: number | null
	/**
	 * 创建者姓名
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	createUserName?: string | null
	/**
	 * 修改者Id
	 * @type {number}
	 * @memberof UploadAvatarRes
	 */
	updateUserId?: number | null
	/**
	 * 修改者姓名
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	updateUserName?: string | null
	/**
	 * 软删除
	 * @type {boolean}
	 * @memberof UploadAvatarRes
	 */
	isDelete?: boolean
	/**
	 * 提供者
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	provider?: string | null
	/**
	 * 仓储名称
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	bucketName?: string | null
	/**
	 * 文件名称（源文件名）
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	fileName?: string | null
	/**
	 * 文件后缀
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	suffix?: string | null
	/**
	 * 存储路径
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	filePath?: string | null
	/**
	 * 文件大小KB
	 * @type {number}
	 * @memberof UploadAvatarRes
	 */
	sizeKb?: number
	/**
	 * 文件大小信息-计算后的
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	sizeInfo?: string | null
	/**
	 * 地址
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	url?: string | null
	/**
	 * 外链访问地址
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	outUrl?: string | null
	/**
	 * 文件MD5
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	fileMd5?: string | null
	/**
	 * 关联对象名称（如子对象）
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	relationName?: string | null
	/**
	 * 关联对象Id
	 * @type {number}
	 * @memberof UploadAvatarRes
	 */
	relationId?: number | null
	/**
	 * 所属Id（如主对象）
	 * @type {number}
	 * @memberof UploadAvatarRes
	 */
	belongId?: number | null
	/**
	 * 文件类别
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	fileType?: string | null
}

/**
 * @description 上传图片输出
 */
export interface UploadImageRes {
	/**
	 * 主键Id
	 * @type {number}
	 * @memberof UploadAvatarRes
	 */
	id?: number
	/**
	 * 创建时间
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	createTime?: string | null
	/**
	 * 更新时间
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	updateTime?: string | null
	/**
	 * 创建者Id
	 * @type {number}
	 * @memberof UploadAvatarRes
	 */
	createUserId?: number | null
	/**
	 * 创建者姓名
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	createUserName?: string | null
	/**
	 * 修改者Id
	 * @type {number}
	 * @memberof UploadAvatarRes
	 */
	updateUserId?: number | null
	/**
	 * 修改者姓名
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	updateUserName?: string | null
	/**
	 * 软删除
	 * @type {boolean}
	 * @memberof UploadAvatarRes
	 */
	isDelete?: boolean
	/**
	 * 提供者
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	provider?: string | null
	/**
	 * 仓储名称
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	bucketName?: string | null
	/**
	 * 文件名称（源文件名）
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	fileName?: string | null
	/**
	 * 文件后缀
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	suffix?: string | null
	/**
	 * 存储路径
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	filePath?: string | null
	/**
	 * 文件大小KB
	 * @type {number}
	 * @memberof UploadAvatarRes
	 */
	sizeKb?: number
	/**
	 * 文件大小信息-计算后的
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	sizeInfo?: string | null
	/**
	 * 地址
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	url?: string | null
	/**
	 * 外链访问地址
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	outUrl?: string | null
	/**
	 * 文件MD5
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	fileMd5?: string | null
	/**
	 * 关联对象名称（如子对象）
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	relationName?: string | null
	/**
	 * 关联对象Id
	 * @type {number}
	 * @memberof UploadAvatarRes
	 */
	relationId?: number | null
	/**
	 * 所属Id（如主对象）
	 * @type {number}
	 * @memberof UploadAvatarRes
	 */
	belongId?: number | null
	/**
	 * 文件类别
	 * @type {string}
	 * @memberof UploadAvatarRes
	 */
	fileType?: string | null
}

/**
 * @description 上传文件输出
 */
export interface UploadFileRes {
	/**
	 * 主键Id
	 * @type {number}
	 * @memberof UploadFileRes
	 */
	id?: number
	/**
	 * 创建时间
	 * @type {string}
	 * @memberof UploadFileRes
	 */
	createTime?: string | null
	/**
	 * 更新时间
	 * @type {string}
	 * @memberof UploadFileRes
	 */
	updateTime?: string | null
	/**
	 * 创建者Id
	 * @type {number}
	 * @memberof UploadFileRes
	 */
	createUserId?: number | null
	/**
	 * 创建者姓名
	 * @type {string}
	 * @memberof UploadFileRes
	 */
	createUserName?: string | null
	/**
	 * 修改者Id
	 * @type {number}
	 * @memberof UploadFileRes
	 */
	updateUserId?: number | null
	/**
	 * 修改者姓名
	 * @type {string}
	 * @memberof UploadFileRes
	 */
	updateUserName?: string | null
	/**
	 * 软删除
	 * @type {boolean}
	 * @memberof UploadFileRes
	 */
	isDelete?: boolean
	/**
	 * 提供者
	 * @type {string}
	 * @memberof UploadFileRes
	 */
	provider?: string | null
	/**
	 * 仓储名称
	 * @type {string}
	 * @memberof UploadFileRes
	 */
	bucketName?: string | null
	/**
	 * 文件名称（源文件名）
	 * @type {string}
	 * @memberof UploadFileRes
	 */
	fileName?: string | null
	/**
	 * 文件后缀
	 * @type {string}
	 * @memberof UploadFileRes
	 */
	suffix?: string | null
	/**
	 * 存储路径
	 * @type {string}
	 * @memberof UploadFileRes
	 */
	filePath?: string | null
	/**
	 * 文件大小KB
	 * @type {number}
	 * @memberof UploadFileRes
	 */
	sizeKb?: number
	/**
	 * 文件大小信息-计算后的
	 * @type {string}
	 * @memberof UploadFileRes
	 */
	sizeInfo?: string | null
	/**
	 * 地址
	 * @type {string}
	 * @memberof UploadFileRes
	 */
	url?: string | null
	/**
	 * 外链访问地址
	 * @type {string}
	 * @memberof UploadFileRes
	 */
	outUrl?: string | null
	/**
	 * 文件MD5
	 * @type {string}
	 * @memberof UploadFileRes
	 */
	fileMd5?: string | null
	/**
	 * 关联对象名称（如子对象）
	 * @type {string}
	 * @memberof UploadFileRes
	 */
	relationName?: string | null
	/**
	 * 关联对象Id
	 * @type {number}
	 * @memberof UploadFileRes
	 */
	relationId?: number | null
	/**
	 * 所属Id（如主对象）
	 * @type {number}
	 * @memberof UploadFileRes
	 */
	belongId?: number | null
	/**
	 * 文件类别
	 * @type {string}
	 * @memberof UploadFileRes
	 */
	fileType?: string | null
}
