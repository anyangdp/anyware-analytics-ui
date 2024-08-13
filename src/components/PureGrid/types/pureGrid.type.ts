/**
 * @description 快速响应
 */
export type Responsive = { span?: number; offset?: number }

/**
 * @description 端点类型
 */
export type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * @description 布局配置
 * @param cols {number | Record<BreakPoint, number>} 列
 * @param collapsed {boolean} 缩放
 * @param collapsedRows {number} 缩放行
 * @param gap {[number, number] | number} 间隔
 */
export type GridProps = {
	cols?: number | Record<BreakPoint, number>
	collapsed?: boolean
	collapsedRows?: number
	gap?: [number, number] | number
}

/**
 * @description 布局子项配置
 * @param offset {number} 偏移
 * @param span {number} 排列
 * @param suffix {boolean} 后缀
 * @param xs {Responsive}
 * @param sm {Responsive}
 * @param md {Responsive}
 * @param lg {Responsive}
 * @param xl {Responsive}
 */
export type GridItemProps = {
	offset?: number
	span?: number
	suffix?: boolean
	xs?: Responsive
	sm?: Responsive
	md?: Responsive
	lg?: Responsive
	xl?: Responsive
}
