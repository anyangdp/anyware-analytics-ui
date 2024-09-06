<script setup lang="tsx">
import { useHandleData } from '@/hooks/useHandleData'
import PureTable from '@/components/PureTable/PureTable.vue'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import MenuDrawer from '@/views/System/Menu/components/MenuDrawer.vue'
import { SYS_MENU_AUTHOR } from '@/recursos/constantes/author.constant'
import { addMenu, delMenu, editMenu, listMenu } from '@/api/system/menu'
import type { MenuListRes } from '@/api/system/interfaces/menu.interface'
import ModifyRecord from '@/components/PureTable/components/ModifyRecord.vue'
import { appActiveDic, menuTypeDic } from '@/recursos/dictionaries/app.dictionary'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'

/**
 * @description 初始化请求参数
 */
const initParam = reactive({ id: 0 })

/**
 * @description pureTable 实例
 */
const pureTable = ref<PureTableInstance>()

/**
 * @description 定义 drawer 实例
 */
const drawerRef = ref<InstanceType<typeof MenuDrawer> | null>(null)

/**
 * @description 表格列配置项
 */
const columns = reactive<ColumnProps<MenuListRes>[]>([
	{ type: 'index', label: '#', width: 80 },
	{
		prop: 'title',
		label: '菜单名称',
		search: { el: 'input' },
		align: 'left',
		render: scope => (
			<>
				{
					<div style='display:inline-block'>
						<pure-icon name={scope.row.icon ?? ''} />
						<span class='ml10'>{scope.row.title}</span>
					</div>
				}
			</>
		)
	},
	{ prop: 'type', label: '菜单类型', width: 100, search: { el: 'select-v2' }, tag: true, enum: menuTypeDic },
	{ prop: 'path', label: '路由地址', width: 200 },
	{ prop: 'component', label: '组件地址', width: 200 },
	{ prop: 'permission', label: '权限标识', width: 200 },
	{ prop: 'orderNo', label: '排序', width: 130 },
	{ prop: 'status', label: '状态', width: 110, tag: true, enum: appActiveDic },
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
 * @param params {MenuListRes} 行数据
 */
const del = async (params: MenuListRes) => {
	await useHandleData(delMenu, params.id, `删除【${params.title}】`)
	pureTable.value?.getTableList()
}

/**
 * @description 打开 drawer
 * @param title {string} 名称
 * @param row {MenuListRes} 行数据
 */
const openDrawer = (
	title: string,
	row: Partial<MenuListRes> = {
		orderNo: 99,
		status: 1,
		type: 2,
		isHide: false,
		isKeepAlive: true,
		isAffix: false,
		isIframe: false
	}
) => {
	const params: DrawerProps<MenuListRes> = {
		title,
		isView: title === '查看',
		row: { ...row },
		api: title === '新增' ? addMenu : title === '编辑' ? editMenu : undefined,
		getTableList: pureTable.value?.getTableList,
		data: pureTable.value?.tableData
	}
	drawerRef.value?.acceptParams(params)
}
</script>

<template>
	<div class="main-box">
		<div class="table-box">
			<PureTable
				ref="pureTable"
				row-key="id"
				:indent="20"
				:pagination="false"
				:columns="columns"
				:request-api="listMenu"
				:init-param="initParam"
				:search-col="{ xs: 1, sm: 1, md: 4, lg: 7, xl: 7 }"
			>
				<!-- 表格 header 按钮 -->
				<template #tableHeader>
					<el-button v-author="SYS_MENU_AUTHOR.ADD" type="primary" @click="openDrawer('新增')">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						新增
					</el-button>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" link v-author="SYS_MENU_AUTHOR.UPDATE" @click="openDrawer('编辑', scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						编辑
					</el-button>
					<el-button type="danger" link v-author="SYS_MENU_AUTHOR.DELETE" @click="del(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
				</template>
			</PureTable>
			<MenuDrawer ref="drawerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
