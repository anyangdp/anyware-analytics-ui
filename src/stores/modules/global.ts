import { defineStore } from 'pinia'
import type { GlobalState } from '@/stores/interfaces/global.interface'

/**
 * @description 全局配置设置
 * @methods setGlobalState 设置全局配置
 * */
export const useGlobalStore = defineStore('pure-global', {
	state: (): GlobalState => ({
		// 布局模式 (纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns)
		layout: 'columns',
		// 主题颜色
		// primary: '#FF4A00',
		primary: '#095EB5',
		// 当前页面是否全屏
		maximize: false,
		// 折叠菜单
		isCollapse: false,
		// 菜单手风琴
		accordion: true,
		// 面包屑导航
		breadcrumb: false,
		// 面包屑导航图标
		breadcrumbIcon: false,
		// 标签页
		tabs: false,
		// 标签页图标
		tabsIcon: false,
		// 页脚
		footer: true,
		// 刷新
		refresh: false
	}),
	actions: {
		// 设置全局
		setGlobalState(...args: ObjToKeyValArray<GlobalState>) {
			this.$patch({ [args[0]]: args[1] })
		},
		clear() {
			this.$reset()
		}
	},
	persist: true
})
