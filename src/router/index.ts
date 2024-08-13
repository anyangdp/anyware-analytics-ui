import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRouterMap } from '@/router/modules/constantRoutes'

/**
 * @description 定义路由
 */
const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	strict: false,
	routes: constantRouterMap,
	// 切换页面，滚动到最顶部
	scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
