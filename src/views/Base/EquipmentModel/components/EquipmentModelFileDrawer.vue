<script setup lang="ts">
import { delFile, uploadFile } from '@/api/system/file'
import { getEquipmentModelFileList } from '@/api/base/equipmentModel'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import type { EquipmentModelFileListRes, EquipmentModelPageRes } from '@/api/base/interfaces/equipmentModel.interface'

/**
 * @description PureTable 实例
 */
const pureTable = ref<PureTableInstance>()

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
 * @description 初始化请求参数
 */
const initParam = reactive({ id: 0 })

/**
 * @description 表格配置项
 */
const columns = reactive<ColumnProps<EquipmentModelFileListRes>[]>([
	{ type: 'index', label: '#', width: 80 },
	{ prop: 'fileName', label: '资料名称' },
	{ prop: 'sizeKb', label: '资料大小(kb)' },
	{ prop: 'createTime', label: '上传时间', width: 180 },
	{ prop: 'operation', label: '操作', width: 120 }
])

/**
 * @description 接收父组件传过来的参数
 */
const acceptParams = async (params: DrawerProps<EquipmentModelPageRes>) => {
	drawerProps.value = params
	drawerVisible.value = true

	initParam.id = drawerProps.value.row.id ?? 0
}

/**
 * @description 上传文件
 */
const beforeUpload = async (file: Blob) => {
	await uploadFile(file, drawerProps.value.row.id)
	ElMessage.success('上传成功')
	pureTable.value?.getTableList()
	return false
}

/**
 * @description 删除文件
 */
const deleteFileItem = async (row: EquipmentModelFileListRes) => {
	await delFile(row.id ?? 0)
	ElMessage.success('删除成功')
	pureTable.value?.getTableList()
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
		<PureTable ref="pureTable" :columns="columns" :init-param="initParam" :pagination="false" :request-api="getEquipmentModelFileList">
			<!-- 表格 header 按钮 -->
			<template #tableHeader>
				<el-upload ref="upload" class="upload-demo" :show-file-list="false" :before-upload="beforeUpload" action="" :limit="1">
					<el-button type="primary">上传资料</el-button>
				</el-upload>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="danger" link v-on:click="deleteFileItem(scope.row)" style="margin-left: 5px">
					<template #icon>
						<pure-icon name="pi-carbon:trash-can"></pure-icon>
					</template>
					删除
				</el-button>
			</template>
		</PureTable>
		<template #footer>
			<el-button v-on:click="drawerVisible = false">取消</el-button>
			<el-button v-show="!drawerProps.isView" type="primary" v-on:click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<style scoped lang="scss"></style>
