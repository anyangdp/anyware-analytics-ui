<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'
import 'vue-json-pretty/lib/styles.css'
import type { SchedulerJobInfoDTO } from '@/api/scheduler/jobinfo.interface'

// 初始化对象
const drawerVisible = ref(false)
const jobDataArray = ref<any>();
const drawerProps = ref<DrawerProps<SchedulerJobInfoDTO>>({
	isView: false,
	title: '',
	row: {}
})

// 验证
const rules = reactive({
	name: [{ required: true, message: '请输入任务名称' }],
	groupName: [{ required: true, message: '请选择任务组' }],
	className: [{ required: true, message: '请选择任务类' }],
	description: [{ required: true, message: '请输入名称描述' }]
})

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps<SchedulerJobInfoDTO>) => {
	drawerProps.value = params
	drawerVisible.value = true

	jobDataArray.value = Object.entries(params.drawerProps.row.jobData || {}).map(([key, value]) => ({
		key,
		value
	}))
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) return
		try {
			await drawerProps.value.api!(drawerProps.value.row)
			ElMessage.success({ message: `${drawerProps.value.title}任务成功！` })
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
					<el-form-item label="任务名称" prop="name">
						<el-input v-model="drawerProps.row!.name" placeholder="请填写url" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="任务组" prop="groupName">
						<el-input v-model="drawerProps.row!.groupName" placeholder="请填写url" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="执行中的任务类" prop="className">
						<el-input v-model="drawerProps.row!.className" placeholder="任务全路径" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="类型" prop="isDurable">
						<el-radio-group v-model="drawerProps.row!.type">
							<el-radio :label="1">普通任务</el-radio>
							<el-radio :label="2">etl任务</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="执行周期" prop="cron">
						<el-input v-model="drawerProps.row!.cron" placeholder="执行周期" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="高级配置" prop="jobData">
						<template v-for="(item, index) in jobDataArray" :key="index">
							<el-input v-model="item.key" placeholder="属性id" clearable></el-input> <el-input v-model="item.value" placeholder="属性值" clearable></el-input>
						</template>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="备注" prop="description">
						<el-input v-model="drawerProps.row!.description" placeholder="请填写备注" clearable></el-input>
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
