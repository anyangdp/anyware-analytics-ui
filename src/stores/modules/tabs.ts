import router from '@/router'
import { useKeepAliveStore } from '@/stores/modules/keepAlive'
import type { TabsMenuProps, TabsState } from '@/stores/interfaces/tabs.interface'

/**
 * tabs 标签页状态共享
 * @methods addTabs 增加选项卡
 * @methods removeTabs 删除选项卡
 * @methods closeTabsOnSide 关闭侧面的选项卡
 * @methods closeMultipleTab 关闭多个选项卡
 * @methods setTabs 设置选项卡
 * @methods setTabsTitle 设置选项卡名称
 * */
export const useTabsStore = defineStore('pure-tabs', {
	state: (): TabsState => ({
		tabsMenuList: []
	}),
	actions: {
		async addTabs(tabItem: TabsMenuProps) {
			if (this.tabsMenuList.every(item => item.path !== tabItem.path)) {
				this.tabsMenuList.push(tabItem)
			}

			// add keepalive
			const keepAliveStore = useKeepAliveStore()
			if (!keepAliveStore.keepAliveName.includes(tabItem.name) && tabItem.isKeepAlive) {
				await keepAliveStore.addKeepAliveName(tabItem.path)
			}
		},
		async removeTabs(tabPath: string, isCurrent: boolean = true) {
			if (isCurrent) {
				this.tabsMenuList.forEach((item, index) => {
					if (item.path !== tabPath) return
					const nextTab = this.tabsMenuList[index + 1] || this.tabsMenuList[index - 1]
					if (!nextTab) return
					router.push(nextTab.path)
				})
			}
			// remove keepalive
			const keepAliveStore = useKeepAliveStore()
			const tabItem = this.tabsMenuList.find(item => item.path === tabPath)
			tabItem?.isKeepAlive && (await keepAliveStore.removeKeepAliveName(tabItem.path))
			// set tabs
			this.tabsMenuList = this.tabsMenuList.filter(item => item.path !== tabPath)
		},
		async closeTabsOnSide(path: string, type: 'left' | 'right') {
			const currentIndex = this.tabsMenuList.findIndex(item => item.path === path)
			if (currentIndex !== -1) {
				const range = type === 'left' ? [0, currentIndex] : [currentIndex + 1, this.tabsMenuList.length]
				this.tabsMenuList = this.tabsMenuList.filter((item, index) => {
					return index < range[0] || index >= range[1] || !item.close
				})
			}

			// set keepalive
			const keepAliveStore = useKeepAliveStore()
			const KeepAliveList = this.tabsMenuList.filter(item => item.isKeepAlive)
			await keepAliveStore.setKeepAliveName(KeepAliveList.map(item => item.path))
		},
		async closeMultipleTab(tabsMenuValue?: string) {
			this.tabsMenuList = this.tabsMenuList.filter(item => {
				return item.path === tabsMenuValue || !item.close
			})

			// set keepalive
			const keepAliveStore = useKeepAliveStore()
			const KeepAliveList = this.tabsMenuList.filter(item => item.isKeepAlive)
			await keepAliveStore.setKeepAliveName(KeepAliveList.map(item => item.path))
		},
		async setTabs(tabsMenuList: TabsMenuProps[]) {
			this.tabsMenuList = tabsMenuList
		},
		async setTabsTitle(title: string) {
			this.tabsMenuList.forEach(item => {
				if (item.path == getUrlWithParams()) item.title = title
			})
		},
		clear() {
			this.$reset()
		}
	},
	persist: true
})

/**
 * @description 获取不同路由模式所对应的 url + params
 * @returns {String}
 */
const getUrlWithParams = (): string => {
	const url = {
		hash: location.hash.substring(1),
		history: location.pathname + location.search
	}
	return url['hash']
}
