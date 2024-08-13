import type { Pageable } from '@/components/PureTable/interfaces/pureTable.interface'

/**
 * @description 页面操作方法数据实例化
 * @param loading {boolean} 加载中
 * @param tableData {any[]} 表格数据
 * @param pageable {Pageable} 分页数据
 * @param searchParam {[key: string]: any} 查询参数(只包括查询)
 * @param searchInitParam {[key: string]: any} 初始化默认的查询参数
 * @param totalParam {[key: string]: any} 总参数(包含分页和查询参数)
 */
export interface StateProps {
	loading: boolean
	tableData: any[]
	pageable: Pageable
	searchParam: {
		[key: string]: any
	}
	searchInitParam: {
		[key: string]: any
	}
	totalParam: {
		[key: string]: any
	}
	icon?: {
		[key: string]: any
	}
}
