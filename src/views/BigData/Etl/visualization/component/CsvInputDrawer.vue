<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'
import 'vue-json-pretty/lib/styles.css'
import type { FileRequestDTO } from '@/api/file/file.interface'
import { directoryAllList } from '@/api/file/sFile'
import FilePickDialog from '@/views/BigData/File/component/FilePickDialog.vue'

/**
 * @description 抛出事件
 */
const emits = defineEmits(['submit'])
// 初始化对象
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps<any>>({
	isView: false,
	title: '',
	row: {}
})

const csvConfig = ref<any>({})

const dialogVisible = ref(false)

const httpConfigHeaders = ref<{ key: string; value: string }[]>([])
const httpConfigQueryParams = ref<{ key: string; value: string }[]>([])
const pickFile = () => {
	dialogVisible.value = true
}
const defaultProps = {
	children: 'children',
	label: 'name',
	isLeaf: (data) => !data.directory, // 目录不是叶子节点
	disabled: (data) => data.directory, // 目录无法选中
}
const initTreeParam = reactive<FileRequestDTO>({})
const loadTree = async (node: any, resolve: any) => {
	if (node.level === 0) {
		return resolve([{ value: '', name: '服务器资源', directory: true }])
	}
	let tree: any = await directoryAllList({ relativePath: node.data.value === '' ? '' : '/' + node.data.name })
	if (tree) {
		resolve(tree)
	} else {
		resolve([])
	}
}

const clickNode = (val: any) => {
	console.log('clickNode: ', val)
	if (!val.directory) {
		// 只有文件才能被点击并填充到 input

	}
}

const handlerPick = (val: any) => {
	console.log('handlerPick: ', val)
	csvConfig.value.filePath = val.relativePath + '/' + val.name
  dialogVisible.value = false
}

// 动态调整 linesToSkip 默认值
watch(csvConfig.value.hasHeader, (newValue) => {
	if (newValue && csvConfig.value.linesToSkip === 0) {
		csvConfig.value.linesToSkip = 1 // 有表头默认跳过 1 行
	} else if (!newValue && csvConfig.value.linesToSkip === 1) {
		csvConfig.value.linesToSkip = 0 // 无表头默认不跳过
	}
})

const addColumn = () => csvConfig.value.columnNames.push('')
const removeColumn = (index: number) => csvConfig.value.columnNames.splice(index, 1)
// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>()

// 验证
const rules = reactive({
	description: [{ required: true, message: '请输入名称描述', trigger: 'blur' }]
})

// 接收父组件传过来的参数
const acceptParams = async (params: DrawerProps<any>) => {
	console.log('params:', params)
	drawerProps.value = params
	drawerVisible.value = true
	csvConfig.value = drawerProps.value.row.csvConfig
	// httpConfigHeaders.value = Object.entries(httpConfig.value.headers || {}).map(([key, value]) => ({ key, value }))
	// httpConfigQueryParams.value = Object.entries(httpConfig.value.queryParams || {}).map(([key, value]) => ({
	// 	key,
	// 	value
	// }))
	// console.log('httpConfig:', httpConfig.value)
}


const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) {
			return
		}
		try {
			drawerProps.value.row.csvConfig = csvConfig.value
			// drawerProps.value.row.httpConfig.headers = headersMap
			// drawerProps.value.row.httpConfig.queryParams = queryParamsMap
			console.log('httpConfig:', drawerProps.value.row)
			emits('submit', drawerProps.value.row)
			drawerVisible.value = false
		} catch (error) {
			console.log(error)
		}
	})
}
const closeDrawer = () => {

}

defineExpose({
	acceptParams
})
</script>

<template>
	<el-drawer v-model="drawerVisible" @close="closeDrawer" :destroy-on-close="true" size="750px"
						 :title="`${drawerProps.title}`">
		<el-form
			:label-position="FORM_LABEL_POSITION"
			ref="ruleFormRef"
			:size="FORM_SIZE"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.row.csvConfig"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="步骤名称" prop="description">
						<el-input v-model="csvConfig.description" placeholder="请填写步骤名称"
											clearable></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="文件路径">
						<el-input v-model="csvConfig.filePath" @click="pickFile" placeholder="请填写文件路径"
											clearable></el-input>
						<file-pick-dialog  v-model:visible="dialogVisible" @submit="handlerPick"/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="是否有表头">
						<el-switch v-model="csvConfig.hasHeader" :disabled="drawerProps.isView" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="35" v-if="!csvConfig.hasHeader">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="列名" prop="columnNames">
						<el-table :data="csvConfig.columnNames" border style="margin-bottom: 10px;">
							<el-table-column label="列名">
								<template #default="scope">
									<el-input v-model="csvConfig.columnNames[scope.$index]" placeholder="请输入列名"
														:disabled="drawerProps.isView" />
								</template>
							</el-table-column>
							<el-table-column label="操作" width="100">
								<template #default="scope">
									<el-button type="danger" size="small" @click="removeColumn(scope.$index)" v-if="!drawerProps.isView">
										删除
									</el-button>
								</template>
							</el-table-column>
						</el-table>
						<el-button type="primary" size="small" @click="addColumn" v-if="!drawerProps.isView">添加列</el-button>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="分隔符" prop="delimiter">
						<el-input v-model="csvConfig.delimiter" placeholder="请输入分隔符（如 , 或 ;）" clearable />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="编码" prop="encoding">
						<el-select v-model="csvConfig.encoding" placeholder="请选择编码">
							<el-option label="UTF-8" value="UTF-8" />
							<el-option label="GBK" value="GBK" />
							<el-option label="ISO-8859-1" value="ISO-8859-1" />
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="跳过行数" prop="linesToSkip">
						<el-input-number v-model="csvConfig.linesToSkip" :min="0" :disabled="drawerProps.isView" />
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
