import { createApp } from 'vue'
import store from '@/stores'
import router from './router'
import directives from '@/directives'
import '@/router/modules/filterRoutes'
import Vue3BaiduMapGL from 'vue3-baidu-map-gl'
import PureIcon from '@/components/PureIcon/PureIcon.vue'

import App from './App.vue'

// 引入 iconfont
import '@/assets/iconfont/iconfont.js'

// 引入全局样式
import '@/styles/index.scss'

// 引入 UnoCSS
import '@/plugins/unocss'

// 引入本地 svg 图片注册
import 'virtual:svg-icons-register'

// 构建 vue 应用实例
const app = createApp(App)

// 注册全局异常
app.config.errorHandler = (error: any) => {
	if (error.status || error.status == 0) return false
	let errorMap: { [key: string]: string } = {
		InternalError: 'Javascript引擎内部错误',
		ReferenceError: '未找到对象',
		TypeError: '使用了错误的类型或对象',
		RangeError: '使用内置对象时，参数超范围',
		SyntaxError: '语法错误',
		EvalError: '错误的使用了Eval',
		URIError: 'URI错误'
	}
	let errorName = errorMap[error.name] || '未知错误'
	ElNotification({
		title: errorName,
		message: error,
		type: 'error',
		duration: 3000
	})
}

// 注册组件
app
	.component('PureIcon', PureIcon)
	.use(Vue3BaiduMapGL, {
		ak: import.meta.env.VITE_BD_AK_KEY
	})
	.use(directives)
	.use(router)
	.use(store)
	.mount('#app')
