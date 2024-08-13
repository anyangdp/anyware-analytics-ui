import type { PureTableProps } from '@/components/PureTable/interfaces/pureTable.interface'

/**
 * @description pure-select-table 参数
 * @param selectedKeys {number[]} 默认选中的数据
 * @param multiple {boolean} 是否多选
 */
export interface PureSelectTableProps extends PureTableProps {
	multiple?: boolean
	keywords: PureSelectTableKeyWordsProps
	width?: number
	label: string | string[]
}

/**
 * @description 页面数据
 */
export interface PureSelectTableShowLabelProps {
	showLabel: string | string[]
}

/**
 * @description 定义下拉表格关键字
 */
export interface PureSelectTableKeyWordsProps {
	label: string
	value: string
}
