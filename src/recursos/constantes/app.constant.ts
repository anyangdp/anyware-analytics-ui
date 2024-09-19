import type { EpPropMergeType } from 'element-plus/lib/utils'

/**
 * @description 首页名称（默认）
 */
export const HOME_TITLE: string = '控制台'

/**
 * @description 首页地址（默认）
 */
export const HOME_URL: string = '/dashboard/home'

/**
 * @description 登录页地址（默认）
 */
export const LOGIN_URL: string = '/login'

/**
 * @description 默认主题颜色
 */
export const DEFAULT_PRIMARY: string = '#409EFF'

/**
 * @description 路由白名单地址（必须是本地存在的路由 staticRouter.ts）
 */
export const ROUTER_WHITE_LIST: string[] = ['/login']

/**
 * @description form 表单 label 布局
 */
export const FORM_LABEL_POSITION: EpPropMergeType<StringConstructor, 'top' | 'left' | 'right', unknown> | undefined = 'top'

/**
 * @description form 表单默认尺寸
 */
export const FORM_SIZE: EpPropMergeType<StringConstructor, '' | 'small' | 'default' | 'large', unknown> | undefined = 'small'

export const HTTP_METHOD = [
	{ label: 'POST', value: 'POST' },
	{ label: 'GET', value: 'GET' },
	{ label: 'PUTTING', value: 'PUTTING' },
	{ label: 'DELETING', value: 'DELETING' },
]