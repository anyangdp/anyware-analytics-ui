<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { UserDTO } from '@/api/system/interfaces/user.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'

const drawerVisible = ref(false)
const ruleFormRef = ref<FormInstance>()

const drawerProps = ref<DrawerProps<UserDTO>>({
	isView: false,
	title: '',
	row: {}
})

const rules = reactive({
	username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
	nickname: [{ required: true, message: '昵称不能为空', trigger: 'blur' }],
	password: [{ required: (rule: any, value: any) => drawerProps.value.title === '新增', message: '密码不能为空', trigger: 'blur' }]
})

const acceptParams = (params: DrawerProps<UserDTO>) => {
	drawerProps.value = params
	drawerVisible.value = true
}

const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) return
		try {
			await drawerProps.value.api!(drawerProps.value.row)
			ElMessage.success(`${drawerProps.value.title}成功！`)
			drawerProps.value.getTableList!()
			drawerVisible.value = false
		} catch (error) {
			console.log(error)
		}
	})
}

defineExpose({
	acceptParams
})
</script>

<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="800px" :title="`${drawerProps.title}用户`">
		<el-form
			:label-position="FORM_LABEL_POSITION"
			ref="ruleFormRef"
			:rules="rules"
			:size="FORM_SIZE"
			:disabled="drawerProps.isView"
			:model="drawerProps.row"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
					<el-form-item label="用户名" prop="username">
						<el-input v-model="drawerProps.row!.username" placeholder="用户名" clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
					<el-form-item label="昵称" prop="nickname">
						<el-input v-model="drawerProps.row!.nickname" placeholder="昵称" clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
					<el-form-item label="密码" prop="password">
						<el-input v-model="drawerProps.row!.password" type="password" placeholder="密码" clearable :disabled="drawerProps.title === '编辑'" />
						<span v-if="drawerProps.title === '编辑'" style="color: #999; font-size: 12px;">编辑时不修改密码请留空</span>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
					<el-form-item label="头像">
						<el-input v-model="drawerProps.row!.avatar" placeholder="头像URL" clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
					<el-form-item label="状态">
						<el-radio-group v-model="drawerProps.row!.active">
							<el-radio :value="true">启用</el-radio>
							<el-radio :value="false">禁用</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button v-show="!drawerProps.isView" type="primary" v-throttle="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<style scoped lang="scss"></style>