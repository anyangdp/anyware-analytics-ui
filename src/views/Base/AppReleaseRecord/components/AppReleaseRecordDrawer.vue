<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'
import type { AppReleaseRecordPageRes } from '@/api/base/interfaces/appReleaseRecord.interface'

/**
 * @description 初始化对象
 */
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps<AppReleaseRecordPageRes>>({
	isView: false,
	title: '',
	row: {}
})

/**
 * @description 表单验证
 */
const rules = reactive({})

/**
 * @description 接收父组件传过来的参数
 */
const acceptParams = (params: DrawerProps<AppReleaseRecordPageRes>) => {
	drawerProps.value = params
	drawerVisible.value = true
}

/**
 * @description 提交数据（新增/编辑）
 */
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) return
		try {
			await drawerProps.value.api!(drawerProps.value.row)
			ElMessage.success({ message: `${drawerProps.value.title}成功！` })
			drawerProps.value.getTableList!()
			drawerVisible.value = false
		} catch (error) {
			console.log(error)
		}
	})
}

/**
 * @description 对外函数
 */
defineExpose({
	acceptParams
})
</script>

<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="650px" :title="`${drawerProps.title}`">
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
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="App类型" prop="appType">
						<el-select v-model="drawerProps.row!.appType" placeholder="请选择App类型">
							<el-option label="Android" value="1" />
							<el-option label="IOS" value="2" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="版本号" prop="versionCode">
						<el-input v-model="drawerProps.row!.versionCode" placeholder="请输入版本号" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="更新类型" prop="updateType">
						<el-select v-model="drawerProps.row!.updateType" placeholder="请选择更新类型">
							<el-option label="选择更新" value="1" />
							<el-option label="强制更新" value="2" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="版本状态" prop="versionStatus">
						<el-select v-model="drawerProps.row!.versionStatus" placeholder="请选择版本状态">
							<el-option label="未发布" value="1" />
							<el-option label="已发布" value="2" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="发布时间" prop="publishTime">
						<el-date-picker v-model="drawerProps.row!.publishTime" type="date" placeholder="发布时间" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="状态" prop="status" :rules="[{ required: true, message: '状态不能为空', trigger: 'blur' }]">
						<el-radio-group v-model="drawerProps.row!.status">
							<el-radio :value="1">启用</el-radio>
							<el-radio :value="0">禁用</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="排序" prop="sort" :rules="[{ required: true, message: '排序不能为空', trigger: 'blur' }]">
						<el-input-number v-model="drawerProps.row!.sort" class="w100" placeholder="请输入排序" clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="下载地址" prop="downloadUrl">
						<el-input v-model="drawerProps.row!.downloadUrl" placeholder="请输入下载地址" type="textarea" maxlength="200" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="更新内容" prop="updateMessage">
						<el-input
							v-model="drawerProps.row!.updateMessage"
							placeholder="请输入更新内容"
							type="textarea"
							maxlength="1000"
							show-word-limit
							clearable
						/>
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
