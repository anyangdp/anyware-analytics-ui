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
		name: '控制台',
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
export const constantBusinessRouterMap: RouteRecordRaw[] = [
	{
		path: '/dashboard',
		component: Layout,
		redirect: '/dashboard/home',
		name: 'Dashboard',
		meta: {
			title: '首页',
			icon: 'pi-ant-design:home-outlined',
			noCache: true
		},
		children: [
			{
				path: '/dashboard/home',
				component: () => import('@/views/Home/Index.vue'),
				name: 'Home',
				meta: { title: '首页' }
			}
		]
	},
	{
		path: '/datasource',
		component: Layout,
		name: 'Etl',
		meta: {
			title: 'etl管理',
			icon: 'pi-ant-design:database-filled',
			noCache: true
		},
		children: [
			{
				path: '/datasource/home',
				component: () => import('@/views/BigData/Datasource/Index.vue'),
				name: 'DatasourceHome',
				meta: { title: '数据源管理', icon: 'pi-ant-design:database-outlined'}
			},
			{
				path: '/datasource/etl',
				component: () => import('@/views/BigData/Etl/Index.vue'),
				name: 'DatasourceEtl',
				meta: { title: 'etl任务', icon: 'pi-ant-design:ordered-list-outlined' }
			}
		]
	},
	{
		path: '/scheduler',
		component: Layout,
		name: 'TaskScheduler',
		meta: {
			title: '任务调度',
			icon: 'pi-carbon:event-schedule',
			noCache: true
		},
		children: [
			{
				path: '/scheduler/home',
				component: () => import('@/views/Scheduler/Index.vue'),
				name: 'Scheduler',
				meta: { title: '调度器管理', icon: 'pi-carbon:batch-job' }
			},
			{
				path: '/scheduler/task',
				component: () => import('@/views/Scheduler/Task/Index.vue'),
				name: 'Task',
				meta: { title: '任务管理', icon: 'pi-carbon:batch-job-step' }
			}
		]
	},
	{
		path: '/data',
		component: Layout,
		name: 'data',
		meta: {
			title: '数仓管理',
			icon: 'pi-carbon:ibm-db2-warehouse',
			noCache: true
		},
		children: [
			{
				path: '/data/warehouse/api',
				component: () => import('@/views/BigData/DataWarehouse/Api/Index.vue'),
				name: 'DataWareHouseApi',
				meta: { title: 'api资产', icon: 'pi-ant-design:api-outlined' }
			},
			// {
			// 	path: '/data/warehouse/api',
			// 	component: () => import('@/views/BigData/DataWarehouse/Api/Index.vue'),
			// 	name: 'DataWareHouseApi',
			// 	meta: { title: '数据资产', icon: 'pi-ant-design:api-outlined' }
			// }
		]
	},
]
