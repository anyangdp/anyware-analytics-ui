<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'
import 'vue-json-pretty/lib/styles.css'
import { ETL_COMPONENT } from '@/recursos/constantes/bigdata.constant'

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

const mappingFields = ref<any[]>([])

const removeMappingField = (index: number) => {
	mappingFields.value.splice(index, 1)
}

const addMappingField = () => {
	// 向 mappingFields 中添加一个新的空对象
	mappingFields.value.push({ name: '', mappingName: '' })
}

const queryMappingFields = () => {
	const seen = new Set()
	return mappingFields.value.filter((item: any) => {
		if (!item.name) {
			return false
		}
		if (seen.has(item.name)) {
			return false // 如果已经存在，过滤掉
		}
		seen.add(item.name)
		return true // 保留第一次出现的项
	})
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>()

// 验证
const rules = reactive({
	description: [{ required: true, message: '请输入名称描述', trigger: 'blur' }]
})

// 接收父组件传过来的参数
const acceptParams = async (params: DrawerProps<any>) => {
	console.log("params:", params)
	drawerProps.value = params
	drawerVisible.value = true
	if (drawerProps?.value.row.mapping) {
		for (const [name, mappingName] of Object.entries(drawerProps?.value.row.mapping)) {
			mappingFields.value.push({ name, mappingName })
		}
	}
}


const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) {
			return
		}
		try {
			for (let field of queryMappingFields()) {
				drawerProps.value.row.mapping[field.name] = field.mappingName
			}
			emits('submit', drawerProps.value.row)
			drawerVisible.value = false
		} catch (error) {
			console.log(error)
		}
	})
}
const closeDrawer = () => {
	drawerProps.value.row = {
		description: '映射',
		mapping: {},
		type: ETL_COMPONENT.fieldMapping.value,
		id: ''
	}
	mappingFields.value.length = 0;
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
			:model="drawerProps.row"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="步骤名称" prop="description">
						<el-input v-model="drawerProps.row!.description" placeholder="请填写步骤名称" clearable></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="转换" prop="transform">
						<div style="width: 100%;">
							<template v-for="(item, index) in mappingFields" :key="index">
								<div style=" display: flex; justify-content: left">
									<div style="width: 30%; margin-right: 10px;">
										字段名:
										<el-input v-model="item.name" placeholder="字段名" clearable></el-input>
									</div>
									<div style="width: 30%; margin-right: 10px;">
										映射:
										<el-input v-model="item.mappingName" placeholder="映射字段" clearable></el-input>
									</div>
									<div style="width: 10%; display: grid">
										<el-button type="danger" link @click="removeMappingField(index)">
											<template #icon>
												<pure-icon name="pi-carbon:trash-can"></pure-icon>
											</template>
											移除
										</el-button>
									</div>
								</div>
								<!--								<el-divider />-->
							</template>
							<el-button type="primary" link @click="addMappingField()">
								<template #icon>
									<pure-icon name="pi-carbon:add"></pure-icon>
								</template>
								添加字段映射
							</el-button>
						</div>
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
