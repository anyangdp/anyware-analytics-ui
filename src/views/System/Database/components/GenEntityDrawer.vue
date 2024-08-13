<script setup lang="ts">
import { camelCase, upperFirst } from 'lodash'
import type { FormInstance } from 'element-plus'

import { getDictDataList as di } from '@/utils/dict.util'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { GenEntityReq } from '@/api/system/interfaces/database.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'

/**
 * @description 初始化对象
 */
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps<GenEntityReq>>({
	isView: false,
	title: '',
	row: {},
	applicationNamespaces: []
})

/**
 * @description 接收父组件传过来的参数
 */
const acceptParams = (params: DrawerProps<GenEntityReq>) => {
	drawerProps.value = params
	drawerVisible.value = true

	drawerProps.value.row!.entityName = upperFirst(camelCase(drawerProps.value.row!.tableName ?? ''))
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
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}`">
		<el-form
			:label-position="FORM_LABEL_POSITION"
			ref="ruleFormRef"
			:size="FORM_SIZE"
			:disabled="drawerProps.isView"
			:model="drawerProps.row"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="表名" prop="tableName" :rules="[{ required: true, message: '表名不能为空', trigger: 'blur' }]">
						<el-input disabled v-model="drawerProps.row!.tableName" placeholder="表名" clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="实体名称" prop="entityName" :rules="[{ required: true, message: '实体名称不能为空', trigger: 'blur' }]">
						<el-input v-model="drawerProps.row!.entityName" placeholder="实体名称" clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="基类" prop="baseClassName" :rules="[{ required: true, message: '基类不能为空', trigger: 'blur' }]">
						<el-select v-model="drawerProps.row!.baseClassName" clearable class="w100">
							<el-option v-for="(item, index) in di('code_gen_base_class')" :key="index" :value="item.code" :label="`${item.value}`"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="存放位置" prop="position" :rules="[{ required: true, message: '存放位置不能为空', trigger: 'blur' }]">
						<el-select v-model="drawerProps.row!.position" filterable clearable class="w100" placeholder="存放位置">
							<el-option v-for="(item, index) in drawerProps.applicationNamespaces" :key="index" :label="item" :value="item" />
						</el-select>
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
