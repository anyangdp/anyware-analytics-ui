<script setup lang="tsx">
import type { FormInstance } from 'element-plus'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { getEmissionIndicatorsList } from '@/api/base/emissionIndicators'
import { MonitorSiteTypeTypeDic } from '@/recursos/dictionaries/app.dictionary'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import type { EmissionTemplateDetailRes, EmissionTemplatePageRes } from '@/api/base/interfaces/emissionTemplate.interface'

/**
 * @description 初始化对象
 */
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps<EmissionTemplatePageRes>>({
	isView: false,
	title: '',
	row: {}
})

/**
 * @description 页面参数
 */
const state = reactive({
	emissionDetailList: [] as Array<EmissionTemplateDetailRes>
})

/**
 * @description 表单验证
 */
const rules = reactive({})

/**
 * @description 表格配置项
 */
const columns = reactive<ColumnProps<EmissionTemplateDetailRes>[]>([
	{ type: 'index', label: '#', width: 50 },
	{ prop: 'emissionIndicatorsName', label: '指标名称' },
	{ prop: 'emissionIndicatorsUnit', label: '指标单位' },
	{
		prop: 'upperConcentration',
		label: '超标上限值',
		render(scope) {
			return <el-input v-model={scope.row.upperConcentration} type='number' />
		}
	},
	{
		prop: 'lowerConcentration',
		label: '超标下限值',
		render(scope) {
			return <el-input v-model={scope.row.lowerConcentration} type='number' />
		}
	},
	{
		prop: 'decimalDigit',
		label: '小数位数',
		render(scope) {
			return <el-input v-model={scope.row.decimalDigit} type='number' />
		}
	}
])

/**
 * @description 接收父组件传过来的参数
 */
const acceptParams = async (params: DrawerProps<EmissionTemplatePageRes>) => {
	drawerProps.value = params
	drawerVisible.value = true
	state.emissionDetailList = []

	// 远程获取指标列表
	let dataEmission = await getEmissionIndicatorsList()

	// 判断是否需要重新加载
	if (drawerProps.value.row.emissionDetailList?.length === 0) {
		dataEmission.result.forEach((item, idx) => {
			state.emissionDetailList.push({
				id: 0,
				emissionIndicatorsId: item.id,
				emissionIndicatorsName: item.name,
				emissionIndicatorsUnit: item.unit
			})
		})
	} else {
		state.emissionDetailList = drawerProps.value.row.emissionDetailList ?? []

		// 判断指标中是否有新增的指标
		let filterArr = dataEmission.result.filter(s => !state.emissionDetailList.some(b => s.id === b.emissionIndicatorsId))
		filterArr.forEach((item, idx) => {
			state.emissionDetailList.push({
				id: 0,
				emissionIndicatorsId: item.id,
				emissionIndicatorsName: item.name,
				emissionIndicatorsUnit: item.unit
			})
		})
	}
}

/**
 * @description 提交数据（新增/编辑）
 */
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) return
		try {
			drawerProps.value.row.emissionDetailList = state.emissionDetailList
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
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="850px" :title="`${drawerProps.title}`">
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
					<el-form-item label="模板名称" prop="name" :rules="[{ required: true, message: '模板名称不能为空', trigger: 'blur' }]">
						<el-input v-model="drawerProps.row.name" placeholder="请输入模板名称" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="业务类型" prop="busType" :rules="[{ required: true, message: '请选择业务类型', trigger: 'blur' }]">
						<el-select v-model="drawerProps.row.busType" placeholder="请选择业务类型">
							<el-option v-for="(item, index) in MonitorSiteTypeTypeDic" :key="item.value" :value="item.value" :label="`${item.label}`"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="状态" prop="status" :rules="[{ required: true, message: '状态不能为空', trigger: 'blur' }]">
						<el-radio-group v-model="drawerProps.row.status">
							<el-radio :value="1">启用</el-radio>
							<el-radio :value="0">禁用</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="排序" prop="sort" :rules="[{ required: true, message: '排序不能为空', trigger: 'blur' }]">
						<el-input-number v-model="drawerProps.row.sort" class="w100" placeholder="请输入排序" clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="监测指标">
						<div class="table-box">
							<pure-table :pagination="false" :data="state.emissionDetailList" :columns="columns" :tool-button="false"></pure-table>
						</div>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="描述" prop="remark">
						<el-input v-model="drawerProps.row.remark" placeholder="请输入描述" type="textarea" maxlength="200" show-word-limit clearable />
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
