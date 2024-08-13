import type { Ref, VNode } from 'vue'
import type { BreakPoint } from '@/components/PureGrid/types/pureGrid.type'
import type { ColumnTypeProps, SearchProps } from '@/components/PureTable/types/pureTable.type'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

/**
 * @description 枚举项配置
 * @param label {string} 选项框显示的文字
 * @param value {string | number | boolean | any[]} 选项框值
 * @param disabled {boolean} 是否禁用此选项
 * @param tagType {string} 当 tag 为 true 时，此选择会指定 tag 显示类型
 * @param children {EnumProps[]} 为树形选择时，可以通过 children 属性指定子选项
 */
export interface EnumProps {
	label?: string
	value?: string | number | boolean | any[]
	disabled?: boolean
	tagType?: string
	children?: EnumProps[]

	[key: string]: any
}

/**
 * @description 列名配置
 * @param label {string} label 名称
 * @param value {string} 值
 * @param children {string} 子集
 */
export interface FieldNamesProps {
	label: string
	value: string
	children?: string
}

/**
 * @description 定义单元格内容渲染配置
 * @param row {T} 单元格
 * @param $index {number} index 标识
 * @param column {TableColumnCtx<T>} 列
 */
export interface RenderProps<T> {
	row: T
	$index: number
	column: TableColumnCtx<T>

	[key: string]: any
}

/**
 * @description 自定义表头内容渲染配置
 * @param $index {number} index 标识
 * @param column {TableColumnCtx<T>} 列
 */
export interface HeaderRenderProps<T> {
	$index: number
	column: TableColumnCtx<T>

	[key: string]: any
}

/**
 * @description pure-table 参数
 * @param columns {ColumnProps[]} 列配置项  ==> 必传
 * @param data {any[]} 静态 table data 数据，若存在则不会使用 requestApi 返回的 data ==> 非必传
 * @param requestApi {(params: any) }  请求表格数据的 api ==> 非必传
 * @param requestAuto {boolean} 是否自动执行请求 api ==> 非必传（默认为 true）
 * @param requestError {(params: any)} 表格 api 请求错误监听 ==> 非必传
 * @param dataCallback {(data: any)} 返回数据的回调函数，可以对数据进行处理 ==> 非必传
 * @param title {string} 表格标题 ==> 非必传
 * @param pagination {boolean} 是否需要分页组件 ==> 非必传（默认为true）
 * @param initParam {any} 初始化请求参数 ==> 非必传（默认为{}）
 * @param border {boolean} 是否带有纵向边框 ==> 非必传（默认为true）
 * @param toolButton {("refresh" | "setting" | "search")[] | boolean} 是否显示表格功能按钮 ==> 非必传（默认为true）
 * @param rowKey {string} 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
 * @param searchCol {number | Record<BreakPoint, number>} 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
 */
export interface PureTableProps {
	columns: ColumnProps[]
	data?: any[]
	requestApi?: (params: any) => Promise<any>
	requestAuto?: boolean
	requestError?: (params: any) => void
	dataCallback?: (data: any) => any
	title?: string
	pagination?: boolean
	initParam?: any
	border?: boolean
	toolButton?: ('refresh' | 'setting' | 'search')[] | boolean
	rowKey?: string
	searchCol?: number | Record<BreakPoint, number>
}

/**
 * @description pure-table-column 参数
 * @param type {ColumnTypeProps} 列类型
 * @param tag {boolean | Ref<boolean>} 是否是标签展示
 * @param isShow {boolean | Ref<boolean>} 是否显示在表格当中
 * @param search {SearchProps | undefined} 搜索项配置
 * @param enum {EnumProps[] | Ref<EnumProps[]> | ((params?: any) => Promise<any>)} 枚举字典
 * @param isFilterEnum {boolean | Ref<boolean>} 当前单元格值是否根据 enum 格式化（示例：enum 只作为搜索项数据）
 * @param fieldNames {FieldNamesProps} 指定 label && value && children 的 key 值
 * @param headerRender { (scope: HeaderRenderProps<T>)} 自定义表头内容渲染（tsx语法）
 * @param render {(scope: RenderProps<T>)} 自定义单元格内容渲染（tsx语法）
 * @param _children {ColumnProps<T>[]} 多级表头
 */
export interface ColumnProps<T = any> extends Partial<Omit<TableColumnCtx<T>, 'type' | 'children' | 'renderCell' | 'renderHeader'>> {
	type?: ColumnTypeProps
	tag?: boolean | Ref<boolean>
	isShow?: boolean | Ref<boolean>
	search?: SearchProps | undefined
	enum?: EnumProps[] | Ref<EnumProps[]> | ((params?: any) => Promise<any>) | any
	isFilterEnum?: boolean | Ref<boolean>
	fieldNames?: FieldNamesProps
	headerRender?: (scope: HeaderRenderProps<T>) => VNode
	render?: (scope: RenderProps<T>) => VNode | string
	_children?: ColumnProps<T>[]
}

/**
 * @description 分页配置
 * @param pageNum {number} 页码
 * @param pageSize {number} 一页数量
 * @param total {number} 总数
 */
export interface Pageable {
	page: number
	pageSize: number
	total: number
}

/**
 * @description 自定义分页配置
 * @param pageable {Pageable} 分页配置
 * @param handleSizeChange {(size: number)} 页码切换
 * @param handleCurrentChange {(currentPage: number)} 当前页切换
 */
export interface PaginationProps {
	pageable: Pageable
	handleSizeChange: (size: number) => void
	handleCurrentChange: (currentPage: number) => void
}
