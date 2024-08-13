import router from '@/router'
import type { RouteRecordRaw } from 'vue-router'
import type { AuthorMenuTree } from '@/api/system/interfaces/author.interface'

/**
 * @description 扫面全部 .views 目录下的 .vue 组件
 */
const modules = import.meta.glob(['../../views/**/*.vue', '../../layout/*.vue'])

/**
 * 处理路由所需格式
 * @param {AuthorMenuTree[]} data 后端返回的菜单数据
 */
export const generateRouter = (data: AuthorMenuTree[] = []): RouteRecordRaw[] => {
	if (data.length === 0) return []
	let routerList: RouteRecordRaw[] = data.map((item: AuthorMenuTree) => {
		const component = item.component === 'Layout' ? modules[`../../layout/Index.vue`] : modules[`../../views${item.component}.vue`]
		let route: RouteRecordRaw = {
			path: item.path ?? '',
			name: item.name ?? '',
			redirect: item.redirect ?? '',
			component: component,
			meta: {
				title: item.meta?.title ?? '',
				icon: item.meta?.icon ?? '',
				auth: false,
				sort: 1,
				isLink: item.meta?.isLink || false,
				isIframe: item.meta?.isIframe || false,
				address: '',
				isHide: item.meta?.isHide || false,
				isKeepAlive: item.meta?.isKeepAlive || false,
				isAffix: item.meta?.isAffix || false,
				isDisable: false,
				isMobile: false,
				roles: [],
				permission: []
			},
			children: []
		}
		if (item.children && item.children.length) {
			route.children = generateRouter(item.children)
		}
		return route
	})
	return routerList
}

/**
 * 添加动态路由
 * @param {RouteRecordRaw[]} routes 规整后的路由
 * */
export function setAddRoute(routes: RouteRecordRaw[]) {
	if (routes && routes.length > 0)
		routes.forEach(route => {
			const routeName = route.name
			if (!router.hasRoute(routeName ?? '')) router.addRoute(route)
		})
}
