/**
 * @description 声明文件，*.vue 后缀的文件交给 vue 模块来处理
 */
declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}

/**
 * @description 声明外部 pnpm 插件模块，防止编译器提示报错
 */
declare module 'lodash'
declare module 'nprogress'
declare module 'lodash-es'
declare module 'sortablejs'
declare module 'path-browserify'
declare module '@wangeditor/editor-for-vue'
declare module 'no-vue3-cron'

/**
 * @description 定义公共接口
 */
declare interface Fn<T = any> {
	(...arg: T[]): T
}

/**
 * @description 定义常用拓展方法
 */
declare type RefType<T = any> = T | null
declare type ObjToKeyValArray<T> = { [K in keyof T]: [K, T[K]] }[keyof T]

/**
 * @description 定义时间类型
 */
declare namespace NodeJS {
	type Timeout = any
}
