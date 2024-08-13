/**
 *@description 分页生成代码请求参数
 */
export interface CodeGenPageReq {
	/**
	 * 业务名（业务代码包名称）
	 */
	busName?: string | null
	/**
	 * 数据库表名
	 */
	tableName?: string | null
}

/**
 * @description 分页生成代码返回参数
 */
export interface CodeGenPageRes {
	/**
	 * 作者姓名
	 */
	authorName?: null | string
	/**
	 * 业务名
	 */
	busName?: null | string
	/**
	 * 库定位器名
	 */
	configId?: string
	/**
	 * 数据库链接
	 */
	connectionString?: null | string
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
	 * 数据库名(保留字段)
	 */
	dbName?: null | string
	/**
	 * 数据库类型
	 */
	dbType?: string
	/**
	 * 是否生成菜单
	 */
	generateMenu?: boolean
	/**
	 * 生成方式
	 */
	generateType?: string
	/**
	 * 主键Id
	 */
	id?: number
	/**
	 * 软删除
	 */
	isDelete?: boolean
	/**
	 * 菜单图标
	 */
	menuIcon?: string
	/**
	 * 菜单编码
	 */
	menuPid?: number
	/**
	 * 命名空间
	 */
	nameSpace?: string
	/**
	 * 页面目录
	 */
	pagePath?: null | string
	/**
	 * 打印模版名称
	 */
	printName?: null | string
	/**
	 * 支持打印类型
	 */
	printType?: null | string
	/**
	 * 数据库表名
	 */
	tableName?: string
	/**
	 * 实体名称
	 */
	entityName?: string
	/**
	 * 是否移除表前缀
	 */
	tablePrefix?: null | string
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
 * @description 编辑生成代码请求参数
 */
export interface CodeGenEditReq {
	/**
	 * 作者姓名
	 */
	authorName?: null | string
	/**
	 * 业务名
	 */
	busName?: null | string
	/**
	 * 库定位器名
	 */
	configId?: null | string
	/**
	 * 数据库链接
	 */
	connectionString?: null | string
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
	 * 数据库名(保留字段)
	 */
	dbName?: null | string
	/**
	 * 数据库类型
	 */
	dbType?: null | string
	/**
	 * 是否生成菜单
	 */
	generateMenu?: boolean
	/**
	 * 生成方式
	 */
	generateType?: null | string
	/**
	 * 主键Id
	 */
	id?: number
	/**
	 * 软删除
	 */
	isDelete?: boolean
	/**
	 * 菜单图标
	 */
	menuIcon?: null | string
	/**
	 * 菜单编码
	 */
	menuPid?: number | null
	/**
	 * 命名空间
	 */
	nameSpace?: null | string
	/**
	 * 页面目录
	 */
	pagePath?: null | string
	/**
	 * 打印模版名称
	 */
	printName?: null | string
	/**
	 * 支持打印类型
	 */
	printType?: null | string
	/**
	 * 数据库表名
	 */
	tableName?: string
	/**
	 * 实体名称
	 */
	entityName?: string
	/**
	 * 是否移除表前缀
	 */
	tablePrefix?: null | string
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
 * 系统代码生成配置返回类
 */
export interface CodeGenConfigListRes {
	/**
	 * 代码生成主表ID
	 */
	codeGenId?: number
	/**
	 * 字段描述
	 */
	columnComment?: null | string
	/**
	 * 主外键
	 */
	columnKey?: null | string
	/**
	 * 字段数据长度
	 */
	columnLength?: number
	/**
	 * 数据库字段名
	 */
	columnName?: null | string
	/**
	 * 数据库中类型（物理类型）
	 */
	dataType?: null | string
	/**
	 * 字典code
	 */
	dictTypeCode?: null | string
	/**
	 * 显示文本字段
	 */
	displayColumn?: null | string
	/**
	 * 作用类型（字典）
	 */
	effectType?: string
	/**
	 * 外键显示字段
	 */
	fkColumnName?: null | string
	/**
	 * 外键显示字段.NET类型
	 */
	fkColumnNetType?: null | string
	/**
	 * 外键实体名称
	 */
	fkEntityName?: null | string
	/**
	 * 外键表名称
	 */
	fkTableName?: null | string
	/**
	 * 主键Id
	 */
	id?: number
	/**
	 * 外键显示字段(首字母小写)
	 */
	lowerFkColumnName?: null | string
	/**
	 * 外键实体名称(首字母小写)
	 */
	lowerFkEntityName?: null | string
	/**
	 * 数据库字段名(首字母小写)
	 */
	lowerPropertyName?: null | string
	/**
	 * .NET类型
	 */
	netType?: null | string
	/**
	 * 排序
	 */
	orderNo?: number
	/**
	 * 父级字段
	 */
	pidColumn?: null | string
	/**
	 * 实体属性名
	 */
	propertyName?: null | string
	/**
	 * 查询方式
	 */
	queryType?: null | string
	/**
	 * 是否是查询条件
	 */
	queryWhether?: null | string
	/**
	 * 表的别名 Table as XXX
	 */
	tableNickName?: null | string
	/**
	 * 选中值字段
	 */
	valueColumn?: null | string
	/**
	 * 增改
	 */
	whetherAddUpdate?: null | string
	/**
	 * 是否是通用字段
	 */
	whetherCommon?: null | string
	/**
	 * 是否必填（字典）
	 */
	whetherRequired?: null | string
	/**
	 * 列表是否缩进（字典）
	 */
	whetherRetract?: null | string
	/**
	 * 是否可排序（字典）
	 */
	whetherSortable?: null | string
	/**
	 * 列表显示
	 */
	whetherTable?: null | string
}
