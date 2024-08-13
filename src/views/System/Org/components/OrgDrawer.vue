<script setup lang="ts" name="OrgDrawer">
import type { CascaderOption, FormInstance } from 'element-plus'

import { getDictDataList as di } from '@/utils/dict.util'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { OrgTreeListRes } from '@/api/system/interfaces/org.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'

/**
 * @description drawer 是否显示
 */
const drawerVisible = ref(false)

/**
 * @description 表单实例
 */
const ruleFormRef = ref<FormInstance>()

/**
 * @description 定义接收参数
 */
const drawerProps = ref<DrawerProps<OrgTreeListRes>>({
	isView: false,
	title: '',
	row: {}
})

/**
 * @description 接收父组件传过来的参数
 */
const acceptParams = (params: DrawerProps<OrgTreeListRes>) => {
	drawerProps.value = params
	drawerVisible.value = true
}

/**
 * @description 表单验证规则
 */
const rules = reactive({
	name: [{ required: true, message: '请输入机构名称' }],
	code: [{ required: true, message: '请输入机构编号' }],
	isManage: [{ required: true, message: '请选择管理部门' }],
	isExecute: [{ required: true, message: '请选择执行部门' }],
	orderNo: [{ required: true, message: '请输入排序' }],
	status: [{ required: true, message: '请选择状态' }]
})

/**
 * @description 提交表单
 */
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
 * @description 导出接收参数方法
 */
defineExpose({
	acceptParams
})
</script>

<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="650px" :title="`${drawerProps.title}机构`">
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
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="上级机构">
						<el-cascader
							:options="drawerProps.data as CascaderOption[] | undefined"
							:props="{ checkStrictly: true, emitPath: false, value: 'id', label: 'name' }"
							placeholder="请选择上级机构"
							clearable
							class="w100"
							v-model="drawerProps.row!.pid"
						>
							<template #default="{ node, data }">
								<span>{{ data.name }}</span>
								<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
							</template>
						</el-cascader>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="机构名称" prop="name">
						<el-input v-model="drawerProps.row!.name" placeholder="机构名称" clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="管理部门" prop="isManage">
						<el-radio-group v-model="drawerProps.row!.isManage">
							<el-radio :value="1">是</el-radio>
							<el-radio :value="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="执行部门" prop="isExecute">
						<el-radio-group v-model="drawerProps.row!.isExecute">
							<el-radio :value="1">是</el-radio>
							<el-radio :value="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="机构编码" prop="code">
						<el-input v-model="drawerProps.row!.code" placeholder="机构编码" clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="级别">
						<el-input-number v-model="drawerProps.row!.level" placeholder="级别" class="w100" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="机构类型">
						<el-select clearable v-model="drawerProps.row!.type" placeholder="请选择机构类型">
							<el-option v-for="(item, index) in di('org_type')" :key="index" :value="item.code" :label="`${item.value}`"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="排序" prop="orderNo">
						<el-input-number v-model="drawerProps.row!.orderNo" placeholder="排序" class="w100" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="状态" prop="status">
						<el-radio-group v-model="drawerProps.row!.status">
							<el-radio :value="1">启用</el-radio>
							<el-radio :value="0">禁用</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="备注">
						<el-input v-model="drawerProps.row!.remark" placeholder="请输入备注内容" clearable type="textarea" />
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
