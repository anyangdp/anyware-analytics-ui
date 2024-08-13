import router from '@/router'
import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/system/author'
import { getAllDictList } from '@/api/system/dict'
import { useTabsStore } from '@/stores/modules/tabs'
import { useAuthorStore } from '@/stores/modules/author'
import { LOGIN_URL } from '@/recursos/constantes/app.constant'
import type { AllListDictRes } from '@/api/system/interfaces/dict.interface'
import type { UserInfoProps, UserState } from '@/stores/interfaces/user.interface'

/**
 * @description 用户信息
 */
export const useUserStore = defineStore('pure-user', {
	state: (): UserState => {
		return {
			userInfo: undefined,
			token: '',
			refreshToken: '',
			tokenExpires: '',
			dictList: []
		}
	},
	getters: {
		getToken(): string {
			return this.token
		},
		getTokenExpires(): string {
			return this.tokenExpires
		},
		getRefreshToke(): string {
			return this.refreshToken
		},
		getUserInfo(): UserInfoProps | undefined {
			return this.userInfo
		}
	},
	actions: {
		setToken(token: string) {
			this.token = token
		},
		setTokenExpires(tokenExpires: string) {
			this.tokenExpires = tokenExpires
		},
		setRefreshToken(refreshToken: string) {
			this.refreshToken = refreshToken
		},
		setUserInfo(info: UserInfoProps | undefined) {
			this.userInfo = info
		},
		async setUserAuthor() {
			const { result } = await getUserInfo()
			const { id, avatar, buttons, realName, menuTrees } = result
			this.setUserInfo({
				userId: id,
				avatar: avatar ?? '',
				name: realName ?? ''
			})

			// 设置菜单、按钮权限信息
			const authorStore = useAuthorStore()
			authorStore.setButtonList(buttons ?? [])
			authorStore.setMenuList(menuTrees ?? [])
		},
		async setDictList() {
			const { result } = await getAllDictList()
			this.dictList = result
		},
		getDictItemByVal(typePCode: string, val: string) {
			if (val) {
				const _val = val.toString()
				const ds = this.getDictDataByCode(typePCode)
				return ds.find((obj: AllListDictRes) => obj.code === val)
			}
			return {}
		},
		getDictDataByCode(dictTypeCode: string): AllListDictRes[] {
			return this.dictList.filter((item: AllListDictRes) => item.typeCode === dictTypeCode) || []
		},
		async reset() {
			const tabStore = useTabsStore()
			tabStore.clear()
			localStorage.clear()
			this.$reset()
			await router.push({ path: LOGIN_URL })
		},
		async logout() {
			await this.reset()
		}
	},
	persist: true
})
