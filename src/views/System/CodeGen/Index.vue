<script setup lang="tsx">
import { useHandleData } from '@/hooks/useHandleData'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { codeGenerateTypeDic } from '@/recursos/dictionaries/app.dictionary'
import ConfigDrawer from '@/views/System/CodeGen/components/ConfigDrawer.vue'
import type { CodeGenPageRes } from '@/api/system/interfaces/codeGen.interface'
import CodeGenDrawer from '@/views/System/CodeGen/components/CodeGenDrawer.vue'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import { addRecord, buildRecord, delRecord, editRecord, getRecordPage } from '@/api/system/codeGen'

/**
 * @description 初始化请求参数
 */
const initParam = reactive({})

/**
 * @description PureTable 实例
 */
const pureTable = ref<PureTableInstance>()

/**
 * @description 表格配置项
 */
const columns = reactive<ColumnProps<CodeGenPageRes>[]>([
	{ type: 'index', label: '#', width: 80 },
	{ prop: 'configId', label: '库定位器' },
	{ prop: 'tableName', label: '表名称', search: { el: 'input' } },
	{ prop: 'busName', label: '业务名', search: { el: 'input' } },
	{ prop: 'nameSpace', label: '命名空间', width: 200 },
	{ prop: 'authorName', label: '作者姓名', width: 200 },
	{ prop: 'generateType', label: '生成方式', width: 200, tag: true, enum: codeGenerateTypeDic },
	{ prop: 'operation', label: '操作', width: 260 }
])

/**
 * @description 删除
 */
const del = async (params: CodeGenPageRes) => {
	await useHandleData(delRecord, params.id, `删除【${params.busName}】`)
	pureTable.value?.getTableList()
}

/**
 * @description 打开 drawer（新增、修改、查看）
 */
const drawerRef = ref<InstanceType<typeof CodeGenDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<CodeGenPageRes> = { generateMenu: true, authorName: 'pure' }) => {
	const params: DrawerProps<CodeGenPageRes> = {
		title,
		isView: title === '查看',
		row: { ...row },
		api: title === '新增' ? addRecord : title === '编辑' ? editRecord : undefined,
		getTableList: pureTable.value?.getTableList
	}
	drawerRef.value?.acceptParams(params)
}

/**
 * @description 生成
 */
const handleGenerate = async (params: CodeGenPageRes) => {
	await useHandleData(buildRecord, params, `生成【${params.busName}】`)
	pureTable.value?.getTableList()
}

// 打开配置
const configDrawerRef = ref<InstanceType<typeof ConfigDrawer> | null>(null)
const openConfigDrawer = (title: string, row: Partial<CodeGenPageRes>) => {
	const params: DrawerProps<CodeGenPageRes> = {
		title,
		isView: false,
		row: { ...row },
		api: undefined,
		getTableList: pureTable.value?.getTableList
	}
	configDrawerRef.value?.acceptParams(params)
}
</script>

<template>
	<div class="main-box">
		<div class="table-box">
			<PureTable
				ref="pureTable"
				:columns="columns"
				:request-api="getRecordPage"
				:init-param="initParam"
				:search-col="{ xs: 1, sm: 1, md: 2, lg: 7, xl: 7 }"
			>
				<!-- 表格 header 按钮 -->
				<template #tableHeader>
					<el-button type="primary" @click="openDrawer('新增')">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						新增
					</el-button>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button size="small" link type="success" @click="handleGenerate(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:play-outline" />
						</template>
						生成
					</el-button>
					<el-button size="small" link type="warning" @click="openConfigDrawer('配置', scope.row)" style="margin-left: 5px">
						<template #icon>
							<pure-icon name="pi-carbon:settings" />
						</template>
						配置
					</el-button>
					<el-button size="small" link type="primary" @click="openDrawer('编辑', scope.row)" style="margin-left: 5px">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						编辑
					</el-button>
					<el-button size="small" link type="danger" @click="del(scope.row)" style="margin-left: 5px">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
				</template>
			</PureTable>
			<CodeGenDrawer ref="drawerRef" />
			<ConfigDrawer ref="configDrawerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
