<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { PosPageRes } from '@/api/system/interfaces/pos.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'
import type { BdDatasourceDTO } from '@/api/bigData/datasource/datasource.interface'

// 初始化对象
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps<BdDatasourceDTO>>({
	isView: false,
	title: '',
	row: {}
})

// 验证
const rules = reactive({
	name: [{ required: true, message: '请输入职位名称' }],
	code: [{ required: true, message: '请输入职位编号' }],
	orderNo: [{ required: true, message: '请输入排序' }],
	status: [{ required: true, message: '请选择状态' }]
})

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps<BdDatasourceDTO>) => {
	drawerProps.value = params
	drawerVisible.value = true
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) return
		try {
			await drawerProps.value.api!(drawerProps.value.row)
			ElMessage.success({ message: `${drawerProps.value.title}数据源成功！` })
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
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}职位`">
		<el-form
			:label-position="FORM_LABEL_POSITION"
			ref="ruleFormRef"
			:size="FORM_SIZE"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.row"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="数据源类型" prop="type">
						<el-input v-model="drawerProps.row!.type" placeholder="请填写数据源类型" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="连接url" prop="url">
						<el-input v-model="drawerProps.row!.url" placeholder="请填写连接url" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="主机" prop="host">
						<el-input v-model="drawerProps.row!.host" placeholder="请填写驱动" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="驱动" prop="driver">
						<el-input v-model="drawerProps.row!.driver" placeholder="请填写驱动" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="用户名" prop="username">
						<el-input v-model="drawerProps.row!.username" placeholder="请填写用户名" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="密码" prop="password">
						<el-input v-model="drawerProps.row!.password" placeholder="请填写密码" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="状态" prop="status">
						<el-radio-group v-model="drawerProps.row!.active">
							<el-radio :label=true>启用</el-radio>
							<el-radio :label=false>禁用</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button v-show="!drawerProps.isView" type="primary" @click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<style scoped lang="scss"></style>
