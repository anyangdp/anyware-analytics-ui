import type { App } from 'vue'

/**
 * @description 索引全部指令 ts 文件
 */
const directives: any = import.meta.glob('./modules/**/*.ts', { eager: true })
export default {
	install(app: App) {
		Object.keys(directives).forEach(key => {
			const name = key.replace(/\.\/modules\/(.*)\.ts/, '$1')
			app.directive(name, directives[key].default)
		})
	}
}
