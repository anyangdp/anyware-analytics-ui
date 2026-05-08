<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { UserDTO } from '@/api/system/interfaces/user.interface'
import { useHandleData } from '@/hooks/useHandleData'
import { resetPassword } from '@/api/system/user'

const props = defineProps<{
	visible: boolean
	user: UserDTO | null
}>()

const emit = defineEmits<{
	(e: 'update:visible', value: boolean): void
	(e: 'success'): void
}>()

const formRef = ref()

const formData = reactive({
	newPassword: ''
})

const rules = reactive({
	newPassword: [
		{ required: true, message: '请输入新密码', trigger: 'blur' },
		{
			validator: (rule: any, value: string, callback: any) => {
				if (value.length < 8) {
					callback(new Error('新密码至少8位'))
					return
				}
				const hasUpper = /[A-Z]/.test(value)
				const hasLower = /[a-z]/.test(value)
				const hasNumber = /\d/.test(value)
				const hasSpecial = /[@$!%*?&]/.test(value)
				const typesCount = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length
				if (typesCount < 3) {
					callback(new Error('新密码需包含大小写字母、数字、特殊符号中的三种以上'))
					return
				}
				callback()
			},
			trigger: 'blur'
		}
	]
})

const handleConfirm = async () => {
	if (!formRef.value) return
	formRef.value.validate(async (valid: boolean) => {
		if (!valid) return
		await useHandleData(resetPassword, { id: props.user!.id!, newPassword: formData.newPassword }, `重置【${props.user!.nickname}】密码`)
		emit('success')
		closeDrawer()
	})
}

const closeDrawer = () => {
	formData.newPassword = ''
	emit('update:visible', false)
}

watch(() => props.visible, (val) => {
	if (val) {
		formData.newPassword = ''
	}
})
</script>

<template>
	<el-drawer
		title="重置密码"
		:visible="visible"
		:size="360"
		@close="closeDrawer"
	>
		<el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
			<el-form-item label="用户名">
				<el-input :value="user?.username" disabled />
			</el-form-item>
			<el-form-item label="昵称">
				<el-input :value="user?.nickname" disabled />
			</el-form-item>
			<el-form-item label="新密码" prop="newPassword">
				<el-input v-model="formData.newPassword" type="password" placeholder="请输入新密码" />
			</el-form-item>
			<el-form-item>
				<p style="font-size: 12px; color: #909399;">
					密码规则：至少8位，包含大小写字母、数字、特殊符号中的三种以上
				</p>
			</el-form-item>
			<el-form-item style="text-align: right; margin-top: 20px;">
				<el-button @click="closeDrawer">取消</el-button>
				<el-button type="primary" @click="handleConfirm">确认重置</el-button>
			</el-form-item>
		</el-form>
	</el-drawer>
</template>
