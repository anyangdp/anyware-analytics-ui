/**
 * @description 数据库对象类型
 */
export enum DbObjectType {
    NUMBER_0 = 0,
    NUMBER_1 = 1,
    NUMBER_2 = 2
}

/**
 * @description 数据表信息返回值
 */
export interface ListDatabaseRes{
    /**
     * 库定位器名
     */
    configId?: string
    /**
     * 数据库连接字符串
     */
    connectionString?: null | string
    /**
     * 数据库类型
     */
    dbType: number
}

/**
 * @description 数据表格信息返回参数
 */
export interface ListTableRes {
    /**
     * 库定位器名
     */
    configId?: null | string
    /**
     * 实体名称
     */
    entityName?: string
    /**
     * 表名称描述（功能名）
     */
    tableComment?: string
    /**
     * 表名（字母形式的）
     */
    tableName?: string
}

/**
 * @description 数据表格列信息返回参数
 */
export interface ListColumnRes {
    /**
     * 列描述
     */
    columnDescription?: null | string
    /**
     * 默认表格字段排序
     */
    createTableFieldSort?: number
    /**
     * 数据类型
     */
    dataType?: null | string
    /**
     * 列名称
     */
    dbColumnName?: null | string
    /**
     * 小数位数
     */
    decimalDigits?: number
    /**
     * 列默认值
     */
    defaultValue?: null | string
    /**
     * 是否集合
     */
    isArray?: boolean
    /**
     * 是否自增
     */
    isIdentity?: boolean
    /**
     * 是否 Json 格式
     */
    isJson?: boolean
    /**
     * 是否允许为空
     */
    isNullable?: boolean
    /**
     * 是否主键
     */
    isPrimarykey?: boolean
    /**
     * 是否未签名
     */
    isUnsigned?: boolean | null
    /**
     * 列长度
     */
    length?: number
    /**
     * 列属性名称
     */
    propertyName?: null | string
    /**
     * 属性类型
     */
    propertyType?: null
    /**
     * 规模
     */
    scale?: number
    /**
     * 表 id
     */
    tableId?: number
    /**
     * 表名称
     */
    tableName?: null | string
    /**
     * 值
     */
    value?: null
}

/**
 * @description 生成实体请求参数
 */
export interface GenEntityReq {
    /**
     * 基类名
     */
    baseClassName?: string
    /**
     * 库标识
     */
    configId?: null | string
    /**
     * 实体名
     */
    entityName?: null | string
    /**
     * 导出位置
     */
    position?: string
    /**
     * 表名
     */
    tableName?: null | string
}

/**
 * @description 生成种子数据请求参数
 */
export interface GenSeedDataReq {
    /**
     * 库标识
     */
    configId?: null | string
    /**
     * 实体名称
     */
    entityName?: null | string
    /**
     * 导出位置
     */
    position?: string
    /**
     * 种子名称
     */
    seedDataName?: null | string
    /**
     * 后缀
     */
    suffix?: null | string
    /**
     * 表名
     */
    tableName?: null | string
}