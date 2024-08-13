<script setup lang="tsx">
import { useIcon } from '@/hooks/useIcon'
import type { FormInstance } from 'element-plus'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import type { EquipmentMaintenanceItemDetailListRes, EquipmentMaintenanceItemPageRes } from '@/api/base/interfaces/equipmentMaintenanceItem.interface'

/**
 * @description 初始化对象
 */
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps<EquipmentMaintenanceItemPageRes>>({
	isView: false,
	title: '',
	row: {}
})

/**
 * @description 页面参数
 */
const state = reactive({
	detailList: [] as Array<EquipmentMaintenanceItemDetailListRes>
})

/**
 * @description 表格配置项
 */
const columns = reactive<ColumnProps<EquipmentMaintenanceItemDetailListRes>[]>([
	{
		prop: 'detailName',
		label: '属性名称',
		render(scope) {
			return <el-input v-model={scope.row.detailName} type='text' />
		}
	},
	{
		prop: 'remark',
		label: '属性描述',
		render(scope) {
			return <el-input v-model={scope.row.remark} type='text' />
		}
	},
	{ prop: 'operation', label: '操作', width: 160 }
])

/**
 * @description 图标
 */
const addIcon = useIcon({ name: 'pi-carbon:add' })
const delIcon = useIcon({ name: 'pi-carbon:trash-can' })

/**
 * @description 自行添加其他规则
 */
const checkDetail = (rule: any, value: any, callback: any) => {
	if (state.detailList.length === 0) {
		return callback(new Error('请输入型号属性'))
	} else {
		let valueFlag = state.detailList.every(item => {
			return item.detailName && item.remark
		})
		if (!valueFlag) {
			return callback(new Error('型号属性请填写完整'))
		} else {
			callback()
		}
	}
}

/**
 * @description 表单验证
 */
const rules = reactive({
	details: [{ required: true, validator: checkDetail, trigger: 'blur' }]
})

/**
 * @description 接收父组件传过来的参数
 */
const acceptParams = (params: DrawerProps<EquipmentMaintenanceItemPageRes>) => {
	drawerProps.value = params
	drawerVisible.value = true

	state.detailList = drawerProps.value.row.detailList ?? []
}

/**
 * @description 新增一行
 */
const addPrimaryColumn = () => {
	state.detailList.push({
		id: 0,
		detailName: '',
		remark: ''
	})
}

/**
 * @description 删除
 */
const handleColDelete = (index: number) => {
	state.detailList.splice(index, 1)
}

/**
 * @description 提交数据（新增/编辑）
 */
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) return
		try {
			drawerProps.value.row.detailList = state.detailList
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
					<el-form-item label="维保项名称" prop="name" :rules="[{ required: true, message: '维保项名称不能为空', trigger: 'blur' }]">
						<el-input v-model="drawerProps.row.name" placeholder="请输入维保项名称" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="维保项单位" prop="unit">
						<el-input v-model="drawerProps.row.unit" placeholder="请输入维保项单位" maxlength="50" show-word-limit clearable />
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
					<el-form-item label="型号属性" prop="details">
						<div class="table-box" style="height: 30vh">
							<pure-table :pagination="false" :data="state.detailList" :columns="columns" :tool-button="false">
								<!-- 表格 header 按钮 -->
								<template #tableHeader>
									<el-button type="primary" :icon="addIcon" @click="addPrimaryColumn">添加一行</el-button>
								</template>
								<!-- 表格操作 -->
								<template #operation="scope">
									<el-button link type="danger" :icon="delIcon" @click.prevent="handleColDelete(scope.$index)"> 删除 </el-button>
								</template>
							</pure-table>
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
