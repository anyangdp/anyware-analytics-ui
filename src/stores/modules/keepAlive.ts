import { defineStore } from 'pinia'
import type { KeepAliveState } from '@/stores/interfaces/alive.interface'

/**
 * tabs 持久化状态
 * @methods addKeepAliveName 增加持久化
 * @methods removeKeepAliveName 删除持久化
 * @methods setKeepAliveName 设置持久化名称
 */
export const useKeepAliveStore = defineStore('pure-keep-alive', {
	state: (): KeepAliveState => ({
		keepAliveName: []
	}),
	actions: {
		async addKeepAliveName(name: string) {
			!this.keepAliveName.includes(name) && this.keepAliveName.push(name)
		},
		async removeKeepAliveName(name: string) {
			this.keepAliveName = this.keepAliveName.filter(item => item !== name)
		},
		async setKeepAliveName(keepAliveName: string[] = []) {
			this.keepAliveName = keepAliveName
		},
		clear() {
			this.$reset()
		}
	}
})
