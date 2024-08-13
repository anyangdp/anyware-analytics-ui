<script setup lang="ts">
import type { CascaderOption, FormInstance } from 'element-plus'

import { listMenu } from '@/api/system/menu'
import { getDictDataList as di } from '@/utils/dict.util'
import { getApplicationNamespaces } from '@/api/system/codeGen'
import { getListDatabase, getListTable } from '@/api/system/database'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { MenuListRes } from '@/api/system/interfaces/menu.interface'
import type { CodeGenPageRes } from '@/api/system/interfaces/codeGen.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'
import type { ListDatabaseRes, ListTableRes } from '@/api/system/interfaces/database.interface'
import PureIconPicker from '@/components/PureIconPicker/PureIconPicker.vue'

/**
 * @description 页面参数
 */
const state = reactive({
	dbData: [] as Array<ListDatabaseRes>,
	tableData: [] as Array<ListTableRes>,
	menuData: [] as Array<MenuListRes>,
	codeGenTypeList: [] as any,
	applicationNamespaces: [] as Array<string>
})

/**
 * @description 初始化对象
 */
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps<CodeGenPageRes>>({
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
const acceptParams = async (params: DrawerProps<CodeGenPageRes>) => {
	drawerProps.value = params
	drawerVisible.value = true

	let resDb = await getListDatabase()
	state.dbData = resDb.result

	let appNamesRes = await getApplicationNamespaces()
	state.applicationNamespaces = appNamesRes.result as Array<string>

	let menuList = await listMenu({})
	state.menuData = menuList.result
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
 * @description 切换数据库
 */
const dbChanged = async () => {
	if (drawerProps.value.row!.configId === '') return
	let res = await getListTable(drawerProps.value.row!.configId as string)
	state.tableData = res.result ?? []

	let db = state.dbData.filter((u: ListDatabaseRes) => u.configId === (drawerProps.value.row!.configId as string))
	drawerProps.value.row!.connectionString = db[0].connectionString
	drawerProps.value.row!.dbType = db[0].dbType.toString()
}

/**
 * @description 表切换方法
 */
const tableChanged = async (item: ListTableRes) => {
	drawerProps.value.row!.tableName = item.tableName
	drawerProps.value.row!.entityName = item.entityName
	drawerProps.value.row!.busName = item.tableComment
}

/**
 * @description 对外函数
 */
defineExpose({
	acceptParams
})
</script>

<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="750px" :title="`${drawerProps.title}`">
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
					<el-form-item label="库定位器" prop="configId">
						<el-select v-model="drawerProps.row!.configId" placeholder="库名" filterable @change="dbChanged()" class="w100">
							<el-option v-for="item in state.dbData" :key="item.configId ?? ''" :label="item.configId ?? ''" :value="item.configId ?? ''" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="库类型" prop="dbType" :rules="[{ required: true, message: '描述不能为空', trigger: 'blur' }]">
						<el-select v-model="drawerProps.row!.dbType" placeholder="数据库类型" clearable disabled class="w100">
							<el-option label="MySql" :value="'0'" />
							<el-option label="SqlServer" :value="'1'" />
							<el-option label="Sqlite" :value="'2'" />
							<el-option label="Oracle" :value="'3'" />
							<el-option label="PostgreSQL" :value="'4'" />
							<el-option label="Dm" :value="'5'" />
							<el-option label="Kdbndp" :value="'6'" />
							<el-option label="Oscar" :value="'7'" />
							<el-option label="MySqlConnector" :value="'8'" />
							<el-option label="Access" :value="'9'" />
							<el-option label="OpenGauss" :value="'10'" />
							<el-option label="QuestDB" :value="'11'" />
							<el-option label="HG" :value="'12'" />
							<el-option label="ClickHouse" :value="'13'" />
							<el-option label="GBase" :value="'14'" />
							<el-option label="Odbc" :value="'15'" />
							<el-option label="OceanBaseForOracle" :value="'16'" />
							<el-option label="TDengine" :value="'17'" />
							<el-option label="GaussDB" :value="'18'" />
							<el-option label="OceanBase" :value="'19'" />
							<el-option label="Tidb" :value="'20'" />
							<el-option label="Vastbase" :value="'21'" />
							<el-option label="PolarDB" :value="'22'" />
							<el-option label="Doris" :value="'23'" />
							<el-option label="Custom" :value="'900'" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="库地址" prop="connectionString">
						<el-input v-model="drawerProps.row!.connectionString" disabled clearable type="textarea" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="生成表" prop="tableName" :rules="[{ required: true, message: '生成表不能为空', trigger: 'blur' }]">
						<el-select v-model="drawerProps.row!.tableName" @change="tableChanged" value-key="value" filterable clearable class="w100">
							<el-option
								v-for="item in state.tableData"
								:key="item.entityName ?? ''"
								:label="item.entityName + ' [' + item.tableComment + ']'"
								:value="item"
							/>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="业务名" prop="busName" :rules="[{ required: true, message: '业务名不能为空', trigger: 'blur' }]">
						<el-input v-model="drawerProps.row!.busName" placeholder="请输入" clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="生成菜单" prop="generateMenu" :rules="[{ required: true, message: '请选择生成菜单', trigger: 'blur' }]">
						<el-radio-group v-model="drawerProps.row!.generateMenu">
							<el-radio :value="true">是</el-radio>
							<el-radio :value="false">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="菜单图标" prop="menuIcon">
						<pure-icon-picker v-model="drawerProps.row!.menuIcon" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="父级菜单" prop="menuPid">
						<el-cascader
							:options="state.menuData as CascaderOption[] | undefined"
							:props="{ checkStrictly: true, emitPath: false, value: 'id', label: 'title' }"
							placeholder="请选择上级菜单"
							:disabled="!drawerProps.row!.generateMenu"
							clearable
							class="w100"
							v-model="drawerProps.row!.menuPid"
						>
							<template #default="{ node, data }">
								<span>{{ data.title }}</span>
								<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
							</template>
						</el-cascader>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="命名空间" prop="nameSpace" :rules="[{ required: true, message: '请选择命名空间', trigger: 'blur' }]">
						<el-select v-model="drawerProps.row!.nameSpace" filterable clearable class="w100" placeholder="命名空间">
							<el-option v-for="(item, index) in state.applicationNamespaces" :key="index" :label="item" :value="item" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="前端目录" prop="pagePath">
						<el-input v-model="drawerProps.row!.pagePath" clearable placeholder="请输入" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="作者姓名" prop="authorName">
						<el-input v-model="drawerProps.row!.authorName" clearable placeholder="请输入" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="生成方式" prop="generateType" :rules="[{ required: true, message: '请选择生成方式', trigger: 'blur' }]">
						<el-select v-model="drawerProps.row!.generateType" filterable class="w100">
							<el-option v-for="(item, index) in di('code_gen_create_type')" :key="index" :value="item.code" :label="`${item.value}`"></el-option>
						</el-select>
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
