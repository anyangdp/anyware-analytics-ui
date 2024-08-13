import { h } from 'vue'
import type { VNode } from 'vue'

import PureIcon from '@/components/PureIcon/PureIcon.vue'
import type { PureIconProps } from '@/components/PureIcon/interfaces/icon.interface'

/**
 * @description 使用图标
 */
export const useIcon = (props: PureIconProps): VNode => {
	return h(PureIcon, props)
}
