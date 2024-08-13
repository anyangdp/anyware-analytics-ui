<script setup lang="ts">
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import type { EquipmentModelPageRes } from '@/api/base/interfaces/equipmentModel.interface'

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
 * @description 页面参数
 */
const state = reactive({
	tableData: [] as any
})

/**
 * @description 表格配置项
 */
const columns = reactive<ColumnProps<CodeGenConfigListRes>[]>([
	{ type: 'index', label: '#', width: 80 },
	{ prop: 'propertyName', label: '资料名称' },
	{ prop: 'netType', label: '资料大小(kb)' },
	{ prop: 'propertyName', label: '上传时间', width: 180 },
	{ prop: 'operation', label: '操作', width: 160 }
])

/**
 * @description 接收父组件传过来的参数
 */
const acceptParams = async (params: DrawerProps<EquipmentModelPageRes>) => {
	drawerProps.value = params
	drawerVisible.value = true
}

/**
 * @description 提交数据
 */
const handleSubmit = () => {
	drawerProps.value.getTableList!()
	drawerVisible.value = false
}

/**
 * @description 对外函数
 */
defineExpose({
	acceptParams
})
</script>

<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="950px" :title="`${drawerProps.title}`">
		<PureTable ref="pureTable" :columns="columns" :pagination="false" :data="state.tableData"> </PureTable>
		<template #footer>
			<el-button v-on:click="drawerVisible = false">取消</el-button>
			<el-button v-show="!drawerProps.isView" type="primary" v-on:click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<style scoped lang="scss"></style>
