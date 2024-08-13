import type { PureTableProps } from '@/components/PureTable/interfaces/pureTable.interface'

/**
 * @description PureTransferTableProps 参数
 */
export interface PureTransferTableProps extends PureTableProps {
	width?: number
	requestLeftApi?: (params: any) => Promise<any>
	requestRightApi?: (params: any) => Promise<any>
	dataLeft?: any[]
	dataRight?: any[]
}
