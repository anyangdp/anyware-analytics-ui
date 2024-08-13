<script setup lang="tsx">
import { useIcon } from '@/hooks/useIcon'
import { useHandleData } from '@/hooks/useHandleData'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { SYS_CONFIG_AUTHOR } from '@/recursos/constantes/author.constant'
import { configSysFlagDic } from '@/recursos/dictionaries/app.dictionary'
import ConfigDrawer from '@/views/System/Config/components/ConfigDrawer.vue'
import ModifyRecord from '@/components/PureTable/components/ModifyRecord.vue'
import type { ConfigPageRes } from '@/api/system/interfaces/config.interface'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import { addConfig, delConfig, editConfig, getConfigPage } from '@/api/system/config'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'

/**
 * @description 初始化请求参数
 */
const initParam = reactive({})

/**
 * @description PureTable 实例
 */
const pureTable = ref<PureTableInstance>()

/**
 * @description 定义图标
 */
const iconAdd = useIcon({ name: 'pi-carbon:add' })

/**
 * @description 表格配置项
 */
const columns = reactive<ColumnProps<ConfigPageRes>[]>([
	{ type: 'index', label: '#', width: 80 },
	{ prop: 'name', label: '配置名称', search: { el: 'input' } },
	{ prop: 'code', label: '配置编码', search: { el: 'input' } },
	{ prop: 'value', label: '属性值' },
	{ prop: 'sysFlag', label: '内置参数', width: 120, tag: true, enum: configSysFlagDic },
	{ prop: 'groupCode', label: '分组编码', width: 130 },
	{ prop: 'orderNo', label: '排序', width: 90 },
	{
		prop: 'createTime',
		label: '修改记录',
		width: 100,
		render: scope => <>{<ModifyRecord data={scope.row} />}</>
	},
	{ prop: 'operation', label: '操作', width: 130 }
])

/**
 * @description 删除
 */
const del = async (params: ConfigPageRes) => {
	await useHandleData(delConfig, params.id, `删除【${params.name}】`)
	pureTable.value?.getTableList()
}

/**
 * @description 打开 drawer（新增、修改、查看）
 */
const drawerRef = ref<InstanceType<typeof ConfigDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<ConfigPageRes> = { orderNo: 99, sysFlag: 2 }) => {
	const params: DrawerProps<ConfigPageRes> = {
		title,
		isView: title === '查看',
		row: { ...row },
		api: title === '新增' ? addConfig : title === '编辑' ? editConfig : undefined,
		getTableList: pureTable.value?.getTableList
	}
	drawerRef.value?.acceptParams(params)
}
</script>

<template>
	<div class="main-box">
		<div class="table-box">
			<PureTable
				ref="pureTable"
				:columns="columns"
				:request-api="getConfigPage"
				:init-param="initParam"
				:search-col="{ xs: 1, sm: 1, md: 2, lg: 7, xl: 7 }"
			>
				<!-- 表格 header 按钮 -->
				<template #tableHeader>
					<el-button type="primary" :icon="iconAdd" v-author="SYS_CONFIG_AUTHOR.ADD" @click="openDrawer('新增')"> 新增 </el-button>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" link v-author="SYS_CONFIG_AUTHOR.UPDATE" @click="openDrawer('编辑', scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						编辑
					</el-button>
					<el-button type="danger" link v-author="SYS_CONFIG_AUTHOR.DELETE" @click="del(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
				</template>
			</PureTable>
			<ConfigDrawer ref="drawerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
