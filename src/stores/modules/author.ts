import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash-es'
import type { RouteRecordRaw } from 'vue-router'
import type { AuthorState } from '@/stores/interfaces/author.interface'
import { constantRouterMap } from '@/router/modules/constantRoutes'
import type { AuthorMenuTree } from '@/api/system/interfaces/author.interface'
import { generateRouter, setAddRoute } from '@/router/modules/dynamicRoutes'

/**
 * @description 用户授权信息
 */
export const useAuthorStore = defineStore('pure-author', {
	state: (): AuthorState => ({
		authButtonList: [],
		authMenuList: [],
		routers: [],
		addRouters: [],
		isAddRouters: false
	}),
	getters: {
		getButtonList(): string[] {
			return this.authButtonList
		},
		getMenuList(): AuthorMenuTree[] {
			return this.authMenuList
		},
		getRouters(): RouteRecordRaw[] {
			return this.routers
		},
		getAddRouters(): RouteRecordRaw[] {
			return this.addRouters
		},
		getIsAddRouters(): boolean {
			return this.isAddRouters
		},
		getBreadcrumbList(): { [key: string]: any } {
			return getAllBreadcrumbList(this.authMenuList)
		}
	},
	actions: {
		InitRouters(): Promise<unknown> {
			return new Promise<void>(resolve => {
				let routerMap: RouteRecordRaw[]
				routerMap = generateRouter(this.authMenuList)

				// 动态路由，404一定要放到最后面
				this.addRouters = routerMap.concat([
					{
						path: '/:path(.*)*',
						redirect: '/404',
						name: '404Page',
						meta: {
							hidden: true,
							breadcrumb: false
						}
					}
				])

				// 渲染菜单的所有路由
				this.routers = cloneDeep(constantRouterMap).concat(routerMap)

				// 增加路由
				setAddRoute(this.addRouters)
				this.setIsAddRouters(true)
				resolve()
			})
		},
		setIsAddRouters(state: boolean): void {
			this.isAddRouters = state
		},
		setMenuList(state: AuthorMenuTree[]): void {
			this.authMenuList = state
		},
		setButtonList(state: string[]) {
			this.authButtonList = state
		},
		clear() {
			this.$reset()
		}
	},
	persist: {
		paths: ['routers', 'addRouters', 'authMenuList', 'authButtonList']
	}
})

/**
 * @description 获取所有面包屑导航列表
 * @returns {{ [key: string]: any; }}
 */
const getAllBreadcrumbList = (menuList: AuthorMenuTree[], parent = [], result: { [key: string]: any } = {}): { [key: string]: any } => {
	for (const item of menuList) {
		result[item.path ?? ''] = [...parent, item]
		if (item.children) getAllBreadcrumbList(item.children, result[item.path ?? ''], result)
	}
	return result
}
