<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { FORM_LABEL_POSITION, FORM_SIZE, HTTP_METHOD } from '@/recursos/constantes/app.constant'
import 'vue-json-pretty/lib/styles.css'
import type { BdApiMetadataDTO, FilterCondition, GroupBy, OrderBy } from '@/api/bigData/api/apimetadata.interface'
import MetadataConfig from '@/views/BigData/DataWarehouse/Api/component/MetadataConfig.vue'

// 初始化对象
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps<BdApiMetadataDTO>>({
	isView: false,
	title: '',
	row: {}
})

// 验证
const rules = reactive({
	name: [{ required: true, message: '请输入api名称' }],
	path: [{ required: true, message: '请输入api路径' }],
	description: [{ required: true, message: '请输入名称描述' }]
})

let metadata = ref<any>({})

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps<BdApiMetadataDTO>) => {
	drawerProps.value = params
	if (drawerProps.value.row!.metadata) {
		metadata.value = JSON.parse(drawerProps.value.row!.metadata); // 初始化 metadata
	} else {
		metadata.value = {
			headers: { 'Content-Type': ["application/json"] },
			sql: '',
			selectFields: [],
			returnType: 'LIST',
			tableName: '',
			conditions: [],
			groupBy: [],
			orderBy: [],
			pageEnable: false,
			resourceId: ''
		}
	}
	drawerVisible.value = true
}

// 处理分页状态变化
const handlePageEnableChange = (isEnabled: boolean) => {
	if (drawerProps.value.row.path) {
		let currentPath = drawerProps.value.row!.path.replace(/\/\{page\}\/\{pageSize\}$/, '');
		if (isEnabled) {
			drawerProps.value.row!.path = currentPath + '/{page}/{pageSize}';
		} else {
			drawerProps.value.row!.path = currentPath;
		}
		console.log('更新后的 API 路径:', drawerProps.value.row!.path);
	}
};

const updateMetadata = (temp) => {
	drawerProps.value.row!.metadata = JSON.stringify(temp);
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) return
		try {
			console.log('提交时的 drawerProps.row:', drawerProps.value.row);
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
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="850px" :title="`${drawerProps.title}任务`">
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
					<el-form-item label="名称" prop="name">
						<el-input v-model="drawerProps.row!.name" placeholder="请填写资产名称" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="路径url" prop="path">
						<el-input v-model="drawerProps.row!.path" placeholder="请填写url" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="请求方法" prop="httpMethod">
						<el-select v-model="drawerProps.row!.httpMethod" placeholder="请选择请求方法">
							<el-option v-for="item in HTTP_METHOD" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="处理方法" prop="handlerClass">
						<el-select v-model="drawerProps.row!.handlerClass" placeholder="请填写处理方法">
							<el-option label="com.mj.web.big.data.handler.DynamicApiHandler" value="com.mj.web.big.data.handler.DynamicApiHandler"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
<!--					<el-form-item label="高级配置" prop="metadata">-->
<!--						<el-input type="textarea"  v-model="drawerProps.row!.metadata" placeholder="请填写高级配置" clearable></el-input>-->
<!--					</el-form-item>-->
					<MetadataConfig :model-value="metadata" @update:model-value="updateMetadata" @page-enable-changed="handlePageEnableChange"></MetadataConfig>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="备注" prop="description">
						<el-input v-model="drawerProps.row!.description" placeholder="请填写备注" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="状态" prop="status">
						<el-radio-group v-model="drawerProps.row!.active">
							<el-radio :label="true">启用</el-radio>
							<el-radio :label="false">禁用</el-radio>
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
