import router from '@/router'
import { close, start } from '@/plugins/nprogress'
import { useUserStore } from '@/stores/modules/user'
import { useAuthorStore } from '@/stores/modules/author'

/**
 * @description 路由前置过滤
 * @param to 即将要进入的目标
 * @param from 当前导航正要离开的路由
 * @param next 导航
 */
router.beforeEach(async (to, from, next) => {
	// 开启进度条
	start()

	// 当前用户信息
	// 注意：在 beforeEach 中调用 pinia 存储的菜单状态是为了避免` Did you forget to install pinia?`这个bug
	const { token } = storeToRefs(useUserStore())

	// 判断当前登录的页面
	if (to.path === '/login') {
		if (token?.value) return next('/')
		return next()
	}

	// 判断是否有 Token，没有 token 跳转到登陆页面并且携带原目标路径
	if (!token?.value) {
		return next({ path: '/login', query: { redirect: to.fullPath } })
	}

	// 获取用户、授权等信息
	const authorStore = useAuthorStore()

	// 如果已经添加过动态路由，直接放行
	if (authorStore.getIsAddRouters) {
		next()
		return
	}

	// 添加动态路由
	await authorStore.InitRouters()
	const redirectPath = from.query.redirect || to.path
	const redirect = decodeURIComponent(redirectPath as string)
	const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
	next(nextData)
})

/**
 * @description 路由后置过滤
 */
router.afterEach(() => {
	// 关闭进度条
	close()
})
