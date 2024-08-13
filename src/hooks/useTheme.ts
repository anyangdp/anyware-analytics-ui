import { ElMessage } from 'element-plus'
import { getLightColor } from '@/utils/color.util'
import { useGlobalStore } from '@/stores/modules/global'
import { DEFAULT_PRIMARY } from '@/recursos/constantes/app.constant'

/**
 * @description 全局主题 hooks
 * @method changePrimary 修改主题颜色
 * */
export const useTheme = () => {
	const globalStore = useGlobalStore()

	/**
	 * @description 修改主题颜色
	 */
	const changePrimary = (val: string | null) => {
		if (!val) {
			val = DEFAULT_PRIMARY
			ElMessage({ type: 'success', message: `主题颜色已重置为 ${DEFAULT_PRIMARY}` })
		}
		// 计算主题颜色变化
		document.documentElement.style.setProperty('--el-color-primary', val)
		for (let i = 1; i <= 9; i++) {
			const primaryColor = `${getLightColor(val, i / 10)}`
			document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, primaryColor)
		}
		globalStore.setGlobalState('primary', val)
	}

	return {
		changePrimary
	}
}
