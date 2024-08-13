import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

/**
 * @description 创建 pinia 实例
 */
const store = createPinia()
store.use(piniaPluginPersistedstate)

/**
 * @description 导出 pinia 用于 main.ts 注册
 */
export default store
