<script setup lang="tsx">
import { useHandleData } from '@/hooks/useHandleData'
import PureTable from '@/components/PureTable/PureTable.vue'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import MenuDrawer from '@/views/System/Menu/components/MenuDrawer.vue'
import { addMenu, delMenu, editMenu, listMenu } from '@/api/system/menu'
import type { MenuListRes } from '@/api/system/interfaces/menu.interface'

import { appActiveDic, menuTypeDic } from '@/recursos/dictionaries/app.dictionary'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'

const initParam = reactive({ id: '' })

const pureTable = ref<PureTableInstance>()

const drawerRef = ref<InstanceType<typeof MenuDrawer> | null>(null)

const columns = reactive<ColumnProps<MenuListRes>[]>([
	{ type: 'index', label: '#', width: 80 },
	{
		prop: 'name',
		label: '菜单名称',
		search: { el: 'input' },
		align: 'left',
		render: scope => (
			<>
				{
					<div style='display:inline-block'>
						<pure-icon name={scope.row.icon ?? ''} />
						<span class='ml10'>{scope.row.name}</span>
					</div>
				}
			</>
		)
	},
	{ prop: 'title', label: '标题', width: 150 },
	{ prop: 'type', label: '菜单类型', width: 100, search: { el: 'select-v2' }, tag: true, enum: menuTypeDic },
	{ prop: 'path', label: '路由地址', width: 200 },
	{ prop: 'component', label: '组件地址', width: 200 },
	{ prop: 'sort', label: '排序', width: 130 },
	{ prop: 'active', label: '状态', width: 110, tag: true, enum: appActiveDic },
	{ prop: 'operation', label: '操作', width: 130 }
])

const del = async (params: MenuListRes) => {
	await useHandleData(delMenu, params.id!, `删除【${params.name}】`)
	pureTable.value?.getTableList()
}

const openDrawer = (
	title: string,
	row: Partial<MenuListRes> = {
		name: '',
		level: 1,
		sort: 99,
		type: 1,
		showAlways: 1
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
				<template #tableHeader>
					<el-button type="primary" @click="openDrawer('新增')">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						新增
					</el-button>
				</template>
				<template #operation="scope">
					<el-button type="primary" link @click="openDrawer('编辑', scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						编辑
					</el-button>
					<el-button type="danger" link @click="del(scope.row)">
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