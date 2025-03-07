<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'
import 'vue-json-pretty/lib/styles.css'

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

const httpConfig = ref<any>({})

const httpConfigHeaders = ref<{ key: string; value: string }[]>([])
const httpConfigQueryParams = ref<{ key: string; value: string }[]>([])

// HTTP 方法选项
const methodOptions = [
	{ label: 'GET', value: 'GET' },
	{ label: 'POST', value: 'POST' }
]

// 添加和删除键值对
const addHeader = () => httpConfigHeaders.value.push({ key: '', value: '' })
const removeHeader = (index: number) => httpConfigHeaders.value.splice(index, 1)
const addQueryParam = () => httpConfigQueryParams.value.push({ key: '', value: '' })
const removeQueryParam = (index: number) => httpConfigQueryParams.value.splice(index, 1)


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
	httpConfig.value = drawerProps.value.row.httpConfig
	httpConfigHeaders.value = Object.entries(httpConfig.value.headers || {}).map(([key, value]) => ({ key, value }))
	httpConfigQueryParams.value = Object.entries(httpConfig.value.queryParams || {}).map(([key, value]) => ({
		key,
		value
	}))
	console.log('httpConfig:', httpConfig.value)
}


const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) {
			return
		}
		try {
			// 将数组转换为 Map 以匹配后端 HashMap
			const headersMap = httpConfigHeaders.value.reduce((acc: Record<string, string>, { key, value }) => {
				if (key) acc[key] = value
				return acc
			}, {})
			const queryParamsMap = httpConfigQueryParams.value.reduce((acc: Record<string, string>, { key, value }) => {
				if (key) acc[key] = value
				return acc
			}, {})
			drawerProps.value.row.httpConfig = httpConfig.value
			drawerProps.value.row.httpConfig.headers = headersMap
			drawerProps.value.row.httpConfig.queryParams = queryParamsMap
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
			:model="drawerProps.row.httpConfig"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="步骤名称" prop="description">
						<el-input v-model="drawerProps.row!.httpConfig.description" placeholder="请填写步骤名称"
											clearable></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="HTTP URL" prop="httpConfig.url">
						<el-input v-model="httpConfig.url" placeholder="请填写 HTTP URL" clearable />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="HTTP 方法" prop="httpConfig.method">
						<el-select v-model="httpConfig.method" placeholder="请选择 HTTP 方法">
							<el-option v-for="option in methodOptions" :key="option.value" :label="option.label"
												 :value="option.value" />
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="头部" prop="httpConfig.headers">
						<el-table :data="httpConfigHeaders" border style="margin-bottom: 10px;">
							<el-table-column label="键" width="200">
								<template #default="scope">
									<el-input v-model="scope.row.key" placeholder="请输入键" :disabled="drawerProps.isView" />
								</template>
							</el-table-column>
							<el-table-column label="值" width="300">
								<template #default="scope">
									<el-input v-model="scope.row.value" placeholder="请输入值" :disabled="drawerProps.isView" />
								</template>
							</el-table-column>
							<el-table-column label="操作" width="100">
								<template #default="scope">
									<el-button type="danger" size="small" @click="removeHeader(scope.$index)" v-if="!drawerProps.isView">
										删除
									</el-button>
								</template>
							</el-table-column>
						</el-table>
						<el-button type="primary" size="small" @click="addHeader" v-if="!drawerProps.isView">添加头部</el-button>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="查询参数" prop="httpConfig.queryParams">
						<el-table :data="httpConfigQueryParams" border style="margin-bottom: 10px;">
							<el-table-column label="键" width="200">
								<template #default="scope">
									<el-input v-model="scope.row.key" placeholder="请输入键" :disabled="drawerProps.isView" />
								</template>
							</el-table-column>
							<el-table-column label="值" width="300">
								<template #default="scope">
									<el-input v-model="scope.row.value" placeholder="请输入值" :disabled="drawerProps.isView" />
								</template>
							</el-table-column>
							<el-table-column label="操作" width="100">
								<template #default="scope">
									<el-button type="danger" size="small" @click="removeQueryParam(scope.$index)"
														 v-if="!drawerProps.isView">
										删除
									</el-button>
								</template>
							</el-table-column>
						</el-table>
						<el-button type="primary" size="small" @click="addQueryParam" v-if="!drawerProps.isView">添加参数
						</el-button>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="请求结构">
						<el-input
							type="textarea"
							v-model="httpConfig.requestBodyFormat"
							:rows="5"
							placeholder="请输入请求body结构"
							:disabled="drawerProps.isView || httpConfig.method !== 'POST'"
						/>
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
