<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'
import 'vue-json-pretty/lib/styles.css'
import type { SchedulerJobInfoDTO } from '@/api/scheduler/jobinfo.interface'
import { getEtlTaskInfoPage } from '@/api/bigData/etl/etl'
import type { BdEtlTaskInfoDTO } from '@/api/bigData/etl/etl.interface'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'

// 初始化对象
const drawerVisible = ref(false)
const jobDataArray = ref<any>()
const drawerProps = ref<DrawerProps<SchedulerJobInfoDTO>>({
	isView: false,
	title: '',
	row: {}
})


// 验证
const rules = reactive({
	name: [{ required: true, message: '请输入任务名称' }],
	groupName: [{ required: true, message: '请选择任务组' }],
	type: [{ required: true, message: '请选择任务类型' }],
	className: [{ required: true, message: '请选择任务类' }],
	description: [{ required: true, message: '请输入名称描述' }]
})

const selectEtlRef = ref()
// 表格配置项
const columns = reactive<ColumnProps<BdEtlTaskInfoDTO>[]>([
	{ type: 'index', label: '序号', width: 80 },
	{ prop: 'id', label: '任务id', width: 150, search: { el: 'input' } },
	{ prop: 'description', label: '任务说明', search: { el: 'input' } }
])

const defaultLabel = ref<string>('请选择etl任务')

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps<SchedulerJobInfoDTO>) => {
	drawerProps.value = params
	drawerVisible.value = true

	jobDataArray.value = Object.entries(params.row.jobData || {}).map(([key, value]) => ({
		key,
		value
	}))
}

const removeProperty = (index: number) => {
	jobDataArray.value.splice(index, 1)
}

const addProperty = () =>{
	// 向 jobDataArray 中添加一个新的空对象
	jobDataArray.value.push({ key: '', value: '' });
}
const removeDuplicateKeys = () => {
	const seen = new Set();
	return jobDataArray.value.filter((item: any) => {
		if (seen.has(item.key)) {
			return false; // 如果已经存在，过滤掉
		}
		seen.add(item.key);
		return true; // 保留第一次出现的项
	})
}
const convertToJSON = (dataArray: any) => {
	const jsonObject: any = {};
	dataArray.forEach((item: any) => {
		if (item.key) { // 确保 key 不为空
			jsonObject[item.key] = item.value;
		}
	});
	return jsonObject;
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) return
		try {
			const uniqueData = removeDuplicateKeys();
			drawerProps.value.row.jobData = convertToJSON(uniqueData);
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
						<el-input v-model="drawerProps.row!.name" placeholder="请填写任务名称" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="任务组" prop="groupName">
						<el-input v-model="drawerProps.row!.groupName" placeholder="任务组名" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="执行中的任务类" prop="className">
						<el-select v-model="drawerProps.row!.className">
							<el-option value="com.mj.web.quartz.job.SampleJob" label="普通任务"></el-option>
							<el-option value="com.mj.web.big.data.job.scheduler.EtlSchedulerJob" label="etl任务"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="类型" prop="type">
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
					<el-form-item label="etl任务" prop="bizId" v-show="drawerProps.row!.type === 2">
						<PureSelectTable
							ref="selectEtlRef"
							:columns="columns"
							:request-auto="true"
							:request-api="getEtlTaskInfoPage"
							:multiple="false"
							:width="800"
							:label="defaultLabel"
							v-model="drawerProps.row!.bizId"
							:keywords="{ label: 'description', value: 'id' }"
						></PureSelectTable>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="高级配置" prop="jobData">
						<div style="width: 100%;">
							<template v-for="(item, index) in jobDataArray" :key="index">
								<div style=" display: flex; justify-content: left">
									<div style="width: 30%; margin-right: 10px;">
										属性id:
										<el-input v-model="item.key" placeholder="属性id" clearable></el-input>
									</div>
									<div style="width: 30%; margin-right: 10px;">
										属性值:
										<el-input v-model="item.value" placeholder="属性值" clearable></el-input>
									</div>
									<div style="width: 10%; display: grid">
										<el-button type="danger" link @click="removeProperty(index)">
											<template #icon>
												<pure-icon name="pi-carbon:trash-can"></pure-icon>
											</template>
											移除
										</el-button>
									</div>
								</div>
								<el-divider />
							</template>
							<el-button type="primary" link @click="addProperty()">
								<template #icon>
									<pure-icon name="pi-carbon:add"></pure-icon>
								</template>
								添加属性
							</el-button>
						</div>
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

<style scoped lang="scss">
</style>
