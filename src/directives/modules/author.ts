import type { DirectiveBinding } from 'vue'
import { useAuthorStore } from '@/stores/modules/author'

/**
 * @description v-author 按钮权限判断指令，使用：v-author="'xxx:xx'"
 */
export default {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		const { value } = binding
		const authorStore = useAuthorStore()
		const buttonList = authorStore.authButtonList ?? []
		if (value instanceof Array && value.length) {
			const hasPermission = value.every(item => buttonList.includes(item))
			if (!hasPermission) el.remove()
		} else if (value !== '') {
			if (!buttonList.includes(value)) el.remove()
		}
	}
}
