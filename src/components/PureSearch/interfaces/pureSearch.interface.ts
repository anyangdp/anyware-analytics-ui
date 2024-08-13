import type { BreakPoint } from '@/components/PureGrid/types/pureGrid.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'

/**
 * @description 搜索表单配置项
 * @param columns {ColumnProps[]} 搜索配置列
 * @param searchParam {{ [key: string]: any }} 搜索参数
 * @param searchCol {number | Record<BreakPoint, number>} 搜索列
 * @param search {(params: any) => void} 搜索方法
 * @param reset {(params: any) => void} 重置方法
 */
export interface SearchFormProps {
	columns?: ColumnProps[]
	searchParam?: { [key: string]: any }
	searchCol: number | Record<BreakPoint, number>
	search: (params: any) => void
	reset: (params: any) => void
}

/**
 * @description 搜索表单项配置项
 * @param columns {ColumnProps} 配置列
 * @param searchParam {{ [key: string]: any }} 搜索参数
 */
export interface SearchFormItemProps {
	column: ColumnProps
	searchParam: { [key: string]: any }
}
