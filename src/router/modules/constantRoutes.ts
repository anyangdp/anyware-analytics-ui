import type { RouteRecordRaw } from 'vue-router'
import { HOME_URL } from '@/recursos/constantes/app.constant'

/**
 * @description 定义布局页
 */
const Layout = () => import('@/layout/Index.vue')

/**
 * @description 定义静态路由
 */
export const constantRouterMap: RouteRecordRaw[] = [
	{
		path: '/',
		name: '一张图',
		redirect: HOME_URL,
		meta: {
			isKeepAlive: true
		}
	},
	{
		path: '/login',
		component: () => import('@/views/Login/Index.vue'),
		name: 'Login',
		meta: {
			hidden: true,
			title: '登录页面',
			noTagsView: true
		}
	},
	{
		path: '/',
		component: Layout,
		children: [
			{
				// 解决路由爆[Vue Router warn]: No match found for location with path
				path: '/:pathMatch(.*)*',
				meta: {
					title: '找不到此页面'
				},
				// redirect: '/404', // 错误方式，刷新立马会导致进入守卫的页面
				component: () => import('@/views/Error/404.vue')
			},
			{
				path: '/404',
				component: () => import('@/views/Error/404.vue'),
				name: 'NoFind',
				meta: {
					hidden: true,
					title: '404',
					noTagsView: true
				}
			}
		]
	}
]

/**
 * @description 定义业务路由
 */
export const constantBusinessRouterMap: RouteRecordRaw[] = [{
	path: '/dashboard',
	component: Layout,
	redirect: '/dashboard/home',
	name: 'Dashboard',
	meta: {
		title: '首页',
		icon: 'dashboard',
		noCache: true
	},
	children: [
		{
			path: '/home',
			component: () => import('@/views/Home/Index.vue'),
			name: 'Home',
			meta: { title: '首页' }
		}
	]
}]
