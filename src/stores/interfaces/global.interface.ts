import type { LayoutType } from '@/recursos/types/global.type'

/**
 * @description 全局状态存储
 * @param {LayoutType} layout 布局
 * @param {boolean} maximize 当前页是否全屏
 * @param {string} primary 主题色
 * @param {boolean} isCollapse 菜单折叠
 * @param {boolean} accordion 菜单手风琴
 * @param {boolean} breadcrumb 面包屑
 * @param {boolean} breadcrumbIcon 面包屑图标
 * @param {boolean} tabs 标签栏
 * @param {boolean} tabsIcon 标签栏图标
 * @param {boolean} footer 菜单折叠
 * @param {boolean} refresh 刷新
 */
export interface GlobalState {
	layout: LayoutType
	maximize: boolean
	primary: string
	isCollapse: boolean
	accordion: boolean
	breadcrumb: boolean
	breadcrumbIcon: boolean
	tabs: boolean
	tabsIcon: boolean
	footer: boolean
	refresh: boolean
}
