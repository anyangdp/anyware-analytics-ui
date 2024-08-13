/**
 * @description 接收父组件参数并设置默认值
 * @param requestApi { (data?: any) => Promise<any>} 请求分类数据的 api ==> 非必传
 * @param data {{ [key: string]: any }[]} 类数据，如果有分类数据，则不会执行 api 请求 ==> 非必传
 * @param title {string} treeFilter 标题 ==> 非必传
 * @param id {string} 选择的id ==> 非必传，默认为 "id"
 * @param label {string} 显示的label ==> 非必传，默认为 "label"
 * @param multiple {boolean} 是否为多选 ==> 非必传，默认为 false
 * @param defaultValue {any} 默认选中的值 ==> 非必传
 */
export interface PureTreeFilterProps {
	requestApi?: (data?: any) => Promise<any>
	data?: { [key: string]: any }[]
	title?: string
	id?: string
	label?: string
	multiple?: boolean
	defaultValue?: any
}
