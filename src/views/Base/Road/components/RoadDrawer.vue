<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { getDictDataList as di } from '@/utils/dict.util'
import MapPickDialog from '@/components/PureMapPick/PureMapPick.vue'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { RoadPageRes } from '@/api/base/interfaces/road.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'

/**
 * @description 地图选择器句柄
 */
const mapPickDialogRef = ref<InstanceType<typeof MapPickDialog>>()

/**
 * @description 初始化对象
 */
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps<RoadPageRes>>({
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
const acceptParams = (params: DrawerProps<RoadPageRes>) => {
	drawerProps.value = params
	drawerVisible.value = true
}

/**
 * @description 打开地图选择弹出层
 */
const openMapPickDialog = () => {
	mapPickDialogRef.value?.openDialog(drawerProps.value.row!.longitude ?? '', drawerProps.value.row!.latitude ?? '')
}

/**
 * @description 获取选中的值
 */
const getMapPickValue = async (e: any) => {
	drawerProps.value.row!.longitude = e.longitude
	drawerProps.value.row!.latitude = e.latitude
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
					<el-form-item label="道路名称" prop="name" :rules="[{ required: true, message: '道路名称不能为空', trigger: 'blur' }]">
						<el-input v-model="drawerProps.row!.name" placeholder="请输入道路名称" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="道路编号" prop="roadCode" :rules="[{ required: true, message: '道路编号不能为空', trigger: 'blur' }]">
						<el-input v-model="drawerProps.row!.roadCode" placeholder="请输入道路编号" maxlength="32" show-word-limit clearable />
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
						<el-input-number v-model="drawerProps.row!.sort" placeholder="请输入排序" class="w100" clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="经纬度">
						<el-col :span="8" style="padding: 0 10px 0 0">
							<el-input v-model="drawerProps.row!.longitude" placeholder="请输入经度" maxlength="32" clearable />
						</el-col>
						<el-col :span="8" style="padding: 0 10px 0 0">
							<el-input v-model="drawerProps.row!.latitude" placeholder="请输入纬度" maxlength="32" clearable />
						</el-col>
						<el-col :span="8" style="padding: 0">
							<el-button type="primary" @click="openMapPickDialog">定位</el-button>
						</el-col>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="乡镇" prop="townshipId">
						<el-select clearable v-model="drawerProps.row!.dicTownshipCode" placeholder="请选择乡镇">
							<el-option v-for="(item, index) in di('base_township')" :key="index" :value="item.code" :label="`${item.value}`"></el-option>
						</el-select>
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
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button v-show="!drawerProps.isView" type="primary" @click="handleSubmit">确定</el-button>
		</template>
		<MapPickDialog ref="mapPickDialogRef" @mapPick="getMapPickValue" />
	</el-drawer>
</template>

<style scoped lang="scss"></style>
