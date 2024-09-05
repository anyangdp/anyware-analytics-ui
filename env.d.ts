/// <reference types="vite/client" />

/**
 * @description 定义系统环境变量 typescript 智能提示
 * @param VITE_APP_DEV {string} 请求接口前缀
 * @param VITE_APP_TITLE {string} 系统标题
 * @param VITE_APP_BASE_API {string} 网络请求公用地址
 * @param VITE_APP_PORT {number} 系统端口号
 * @param VITE_SM_PUBLIC_KEY {string} sm 加密公钥
 * @param VITE_BD_AK_KEY {string} 百度地图 ak 码
 */
interface ImportMetaEnv {
	readonly VITE_APP_DEV: string
	readonly VITE_APP_TITLE: string
	readonly VITE_APP_BASE_API: string
	readonly VITE_APP_PORT: number
	readonly VITE_SM_PUBLIC_KEY: string
	readonly VITE_BD_AK_KEY: string
}

/**
 * @description 为环境变量增加智能提示
 * @param env {ImportMetaEnv} 环境变量详情
 */
interface ImportMeta {
	readonly env: ImportMetaEnv
}
