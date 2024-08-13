<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
import { useGlobalStore } from '@/stores/modules/global'

const visible = ref(false)
const userStore = useUserStore()
const globalStore = useGlobalStore()

const avatar = computed(() => {
	let userAvatar = userStore.userInfo?.avatar
	if (typeof userAvatar === 'undefined' || userAvatar == null || userAvatar === '') {
		return './src/assets/avatar.jpg'
	} else {
		return userStore.userInfo?.avatar
	}
})

const colorIcon = computed(() => {
	const layout = globalStore.layout
	if (layout === 'columns') {
		return 'black'
	} else return 'white'
})

const onChange = (show: boolean) => {
	visible.value = show
}

const handleCommand = (command: string) => {
	if (command === 'logout') {
		logout()
	}
}

const logout = () => {
	ElMessageBox.confirm('您确定要退出吗？', '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning'
	}).then(async () => {
		await userStore.logout()
		ElMessage.success('退出登录成功！')
	})
}
</script>

<template>
	<el-dropdown trigger="click" @visible-change="onChange" @command="handleCommand">
		<div class="avatar-dropdown">
			<img class="user-avatar" :src="avatar" alt="" />
			<div class="user-name" :style="'color:' + colorIcon">{{ userStore.userInfo?.name }}</div>
			<el-icon class="up-down">
				<pure-icon name="pi-ep:arrow-down" v-if="!visible" :color="colorIcon"></pure-icon>
				<pure-icon name="pi-ep:arrow-up" v-else :color="colorIcon"></pure-icon>
			</el-icon>
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item command="logout">
					<pure-icon name="pi-ep:switch-button" :size="14" />
					<span>退出登陆</span>
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<style scoped lang="scss">
.avatar-dropdown {
	display: flex;
	align-content: center;
	align-items: center;
	justify-content: center;
	justify-items: center;
	height: 50px;
	padding: 0;

	.user-avatar {
		width: 30px;
		height: 30px;
		cursor: pointer;
		border-radius: 50%;
	}

	.user-name {
		margin: 0 6px;
		cursor: pointer;
	}
}

.user-select-dropdown {
	position: absolute !important;
	top: 0px !important;
	left: 0px !important;
}
</style>
