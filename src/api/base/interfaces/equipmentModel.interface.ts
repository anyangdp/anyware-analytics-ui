/**
 * @description 设备规格型号分页请求参数
 */
export interface EquipmentModelPageReq {}

/**
 * @description 设备规格型号分页返回参数
 */
export interface EquipmentModelPageRes {
	/**
	* 主键Id
	*/
	id: number
	
	/**
	* 租户Id
	*/
	tenantId?: number
	
	/**
	* 设备类别 id
	*/
	equipmentCategoryId: number
	
	/**
	* 设备品牌 id
	*/
	equipmentBrandId: number
	
	/**
	* 设备功率（KW）
	*/
	power?: number
	
	/**
	* 规格型号
	*/
	specification?: string
	
	/**
	* 描述
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
 * @description 设备规格型号修改请求参数
 */
export interface EquipmentModelEditReq {
	/**
	* 主键Id
	*/
	id: number
	
	/**
	* 租户Id
	*/
	tenantId?: number
	
	/**
	* 设备类别 id
	*/
	equipmentCategoryId: number
	
	/**
	* 设备品牌 id
	*/
	equipmentBrandId: number
	
	/**
	* 设备功率（KW）
	*/
	power?: number
	
	/**
	* 规格型号
	*/
	specification?: string
	
	/**
	* 描述
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
 * @description 设备规则型号资料列表
 */
export interface EquipmentModelFileListRes {
	/**
	 * 主键Id
	 * @type {number}
	 * @memberof EquipmentModelFileListRes
	 */
	id?: number
	/**
	 * 创建时间
	 * @type {string}
	 * @memberof EquipmentModelFileListRes
	 */
	createTime?: string | null
	/**
	 * 更新时间
	 * @type {string}
	 * @memberof EquipmentModelFileListRes
	 */
	updateTime?: string | null
	/**
	 * 创建者Id
	 * @type {number}
	 * @memberof EquipmentModelFileListRes
	 */
	createUserId?: number | null
	/**
	 * 创建者姓名
	 * @type {string}
	 * @memberof EquipmentModelFileListRes
	 */
	createUserName?: string | null
	/**
	 * 修改者Id
	 * @type {number}
	 * @memberof EquipmentModelFileListRes
	 */
	updateUserId?: number | null
	/**
	 * 修改者姓名
	 * @type {string}
	 * @memberof EquipmentModelFileListRes
	 */
	updateUserName?: string | null
	/**
	 * 软删除
	 * @type {boolean}
	 * @memberof EquipmentModelFileListRes
	 */
	isDelete?: boolean
	/**
	 * 提供者
	 * @type {string}
	 * @memberof EquipmentModelFileListRes
	 */
	provider?: string | null
	/**
	 * 仓储名称
	 * @type {string}
	 * @memberof EquipmentModelFileListRes
	 */
	bucketName?: string | null
	/**
	 * 文件名称（源文件名）
	 * @type {string}
	 * @memberof EquipmentModelFileListRes
	 */
	fileName?: string | null
	/**
	 * 文件后缀
	 * @type {string}
	 * @memberof EquipmentModelFileListRes
	 */
	suffix?: string | null
	/**
	 * 存储路径
	 * @type {string}
	 * @memberof EquipmentModelFileListRes
	 */
	filePath?: string | null
	/**
	 * 文件大小KB
	 * @type {number}
	 * @memberof EquipmentModelFileListRes
	 */
	sizeKb?: number
	/**
	 * 文件大小信息-计算后的
	 * @type {string}
	 * @memberof EquipmentModelFileListRes
	 */
	sizeInfo?: string | null
	/**
	 * 地址
	 * @type {string}
	 * @memberof EquipmentModelFileListRes
	 */
	url?: string | null
	/**
	 * 外链访问地址
	 * @type {string}
	 * @memberof EquipmentModelFileListRes
	 */
	outUrl?: string | null
	/**
	 * 文件MD5
	 * @type {string}
	 * @memberof EquipmentModelFileListRes
	 */
	fileMd5?: string | null
	/**
	 * 关联对象名称（如子对象）
	 * @type {string}
	 * @memberof EquipmentModelFileListRes
	 */
	relationName?: string | null
	/**
	 * 关联对象Id
	 * @type {number}
	 * @memberof EquipmentModelFileListRes
	 */
	relationId?: number | null
	/**
	 * 所属Id（如主对象）
	 * @type {number}
	 * @memberof EquipmentModelFileListRes
	 */
	belongId?: number | null
	/**
	 * 文件类别
	 * @type {string}
	 * @memberof EquipmentModelFileListRes
	 */
	fileType?: string | null
}