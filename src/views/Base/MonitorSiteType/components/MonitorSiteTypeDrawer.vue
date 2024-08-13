<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import PureIconPicker from '@/components/PureIconPicker/PureIconPicker.vue'
import { MonitorSiteTypeTypeDic } from '@/recursos/dictionaries/app.dictionary'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'
import type { MonitorSiteTypePageRes } from '@/api/base/interfaces/monitorSiteType.interface'

/**
 *  初始化对象
 */
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps<MonitorSiteTypePageRes>>({
	isView: false,
	title: '',
	row: {}
})

/**
 *  表单验证
 */
const rules = reactive({})

/**
 *  接收父组件传过来的参数
 */
const acceptParams = (params: DrawerProps<MonitorSiteTypePageRes>) => {
	drawerProps.value = params
	drawerVisible.value = true
}

/**
 *  提交数据（新增/编辑）
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
 *  对外函数
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
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="站点类型名称" prop="name" :rules="[{ required: true, message: '站点类型名称不能为空', trigger: 'blur' }]">
						<el-input v-model="drawerProps.row!.name" placeholder="请输入站点类型名称" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="类型标识" prop="monitorSiteType" :rules="[{ required: true, message: '请选择类型标识', trigger: 'blur' }]">
						<el-select v-model="drawerProps.row!.monitorSiteType" placeholder="请选择类型标识">
							<el-option v-for="(item, index) in MonitorSiteTypeTypeDic" :key="item.value" :value="item.value" :label="`${item.label}`"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="站点图标" prop="imgUrl" :rules="[{ required: true, message: '请选择站点图标', trigger: 'blur' }]">
						<pure-icon-picker v-model="drawerProps.row!.imgUrl" />
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
