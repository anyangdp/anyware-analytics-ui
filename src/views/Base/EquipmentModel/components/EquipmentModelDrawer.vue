<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { getListEquipmentBrand } from '@/api/base/equipmentBrand'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { getListEquipmentCategory } from '@/api/base/equipmentCategory'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'
import type { EquipmentBrandListRes } from '@/api/base/interfaces/equipmentBrand.interface'
import type { EquipmentModelPageRes } from '@/api/base/interfaces/equipmentModel.interface'
import type { EquipmentCategoryListRes } from '@/api/base/interfaces/equipmentCategory.interface'

/**
 * @description 初始化对象
 */
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps<EquipmentModelPageRes>>({
	isView: false,
	title: '',
	row: {}
})

/**
 * @description 页面使用参数
 */
const state = reactive({
	listEquipmentCategory: [] as Array<EquipmentCategoryListRes>,
	listEquipmentBrand: [] as Array<EquipmentBrandListRes>
})

/**
 * @description 表单验证
 */
const rules = reactive({})

/**
 * @description 接收父组件传过来的参数
 */
const acceptParams = async (params: DrawerProps<EquipmentModelPageRes>) => {
	drawerProps.value = params
	drawerVisible.value = true

	let dataEquipmentBrand = await getListEquipmentBrand()
	let dataEquipmentCategory = await getListEquipmentCategory()

	state.listEquipmentBrand = dataEquipmentBrand.result ?? []
	state.listEquipmentCategory = dataEquipmentCategory.result ?? []
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
					<el-form-item label="设备类别" prop="equipmentCategoryId" :rules="[{ required: true, message: '设备类别不能为空', trigger: 'blur' }]">
						<el-select v-model="drawerProps.row!.equipmentCategoryId" placeholder="请选择设备类别" class="w100">
							<el-option v-for="d in state.listEquipmentCategory" :key="d.id" :label="d.name" :value="d.id" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="设备品牌" prop="equipmentBrandId" :rules="[{ required: true, message: '设备品牌不能为空', trigger: 'blur' }]">
						<el-select v-model="drawerProps.row!.equipmentBrandId" placeholder="请选择设备品牌" class="w100">
							<el-option v-for="d in state.listEquipmentBrand" :key="d.id" :label="d.name" :value="d.id" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="设备功率（KW）" prop="power">
						<el-input v-model="drawerProps.row!.power" placeholder="请输入设备功率（KW）" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="规格型号" prop="规格型号">
						<el-input v-model="drawerProps.row!.specification" placeholder="请输入规格型号" maxlength="50" show-word-limit clearable />
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
					<el-form-item label="描述" prop="remark">
						<el-input v-model="drawerProps.row!.remark" placeholder="请输入描述" type="textarea" maxlength="200" show-word-limit clearable />
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<el-button v-on:click="drawerVisible = false">取消</el-button>
			<el-button v-show="!drawerProps.isView" type="primary" v-on:click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<style scoped lang="scss"></style>
