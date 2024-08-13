import type { ComponentPublicInstance, Ref, VNode } from 'vue'

import PureTable from '@/components/PureTable/PureTable.vue'
import type { BreakPoint, Responsive } from '@/components/PureGrid/types/pureGrid.type'
import type { EnumProps, PureTableProps } from '@/components/PureTable/interfaces/pureTable.interface'

/**
 * @description 导出 PureTable 实例
 */
export type PureTableInstance = Omit<InstanceType<typeof PureTable>, keyof ComponentPublicInstance | keyof PureTableProps>

/**
 * @description 列类型
 */
export type ColumnTypeProps = 'index' | 'selection' | 'radio' | 'expand' | 'sort'

/**
 * @description 搜索项类型
 */
export type SearchType =
	| 'input'
	| 'input-number'
	| 'select'
	| 'select-v2'
	| 'tree-select'
	| 'cascader'
	| 'date-picker'
	| 'time-picker'
	| 'time-select'
	| 'switch'
	| 'slider'

/**
 * @description 搜索内容渲染配置
 * @param searchParam {[key: string]: any} 搜索条件
 * @param placeholder {string} 搜索框提示
 * @param clearable {boolean} 是否清空
 * @param opions {EnumProps[]} 配置项
 * @param data {EnumProps[]} 数据
 */
export type SearchRenderScope = {
	searchParam: { [key: string]: any }
	placeholder: string
	clearable: boolean
	options: EnumProps[]
	data: EnumProps[]
}

/**
 * @description搜索项配置
 * @param el {SearchType} 当前项搜索框的类型
 * @param label {string} 当前项搜索框的 label
 * @param props {any} 搜索项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组件
 * @param key {string} 当搜索项 key 不为 prop 属性时，可通过 key 指定
 * @param tooltip {string} 搜索提示
 * @param order {number} 搜索项排序（从大到小）
 * @param span {number} 搜索项所占用的列数，默认为 1 列
 * @param offset {number} 搜索字段左侧偏移列数
 * @param defaultValue {string | number | boolean | any[] | Ref<any>} 搜索项默认值
 * @param render {(scope: SearchRenderScope)} 自定义搜索内容渲染（tsx语法）
 */
export type SearchProps = {
	el?: SearchType
	label?: string
	props?: any
	key?: string
	tooltip?: string
	order?: number
	span?: number
	offset?: number
	defaultValue?: string | number | boolean | any[] | Ref<any>
	render?: (scope: SearchRenderScope) => VNode
} & Partial<Record<BreakPoint, Responsive>>

/**
 * @description 修改记录相关字段定义
 * @param createUserName {string | null} 创建人名称
 * @param createTime {string | null} 创建时间
 * @param updateUserName {string | null} 更新人名称
 * @param updateTime {string | null} 更新时间
 * @param remark {string | null} 备注
 */
export type ModifyRecord = {
	createUserName?: string | null
	createTime?: string | null
	updateUserName?: string | null
	updateTime?: string | null
	remark?: string | null
}
