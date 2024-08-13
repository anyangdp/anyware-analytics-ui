<script setup lang="ts">
import type { FormInstance } from 'element-plus'

import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { DictDataPageRes } from '@/api/system/interfaces/dict.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'

/**
 * @description 初始化对象
 */
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps<DictDataPageRes>>({
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
const acceptParams = (params: DrawerProps<DictDataPageRes>) => {
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
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="750px" :title="`${drawerProps.title}`">
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
					<el-form-item label="字典值" prop="value" :rules="[{ required: true, message: '字典值不能为空', trigger: 'blur' }]">
						<el-input v-model="drawerProps.row!.value" placeholder="字典值" clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="编码" prop="code" :rules="[{ required: true, message: '编码不能为空', trigger: 'blur' }]">
						<el-input v-model="drawerProps.row!.code" placeholder="编码" clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="名称" prop="name" :rules="[{ required: true, message: '名称不能为空', trigger: 'blur' }]">
						<el-input v-model="drawerProps.row!.name" placeholder="名称" clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="标签类型">
						<el-radio-group v-model="drawerProps.row!.tagType">
							<el-radio value="primary">
								<el-tag type="primary">主题色</el-tag>
							</el-radio>
							<el-radio value="success">
								<el-tag type="success">success</el-tag>
							</el-radio>
							<el-radio value="info">
								<el-tag type="info">info</el-tag>
							</el-radio>
							<el-radio value="warning">
								<el-tag type="warning">warning</el-tag>
							</el-radio>
							<el-radio value="danger">
								<el-tag type="danger">danger</el-tag>
							</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="样式(Style)" prop="styleSetting">
						<el-input v-model="drawerProps.row!.styleSetting" placeholder="样式(Style)" clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="样式(Class)" prop="classSetting">
						<el-input v-model="drawerProps.row!.classSetting" placeholder="样式(Class)" clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="状态">
						<el-radio-group v-model="drawerProps.row!.status">
							<el-radio :value="1">启用</el-radio>
							<el-radio :value="0">禁用</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="排序">
						<el-input-number v-model="drawerProps.row!.orderNo" placeholder="排序" class="w100" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="备注">
						<el-input v-model="drawerProps.row!.remark" placeholder="请输入备注内容" clearable type="textarea" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="拓展数据">
						<el-input v-model="drawerProps.row!.extData" placeholder="请输入拓展数据" clearable type="textarea" rows="6" />
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
