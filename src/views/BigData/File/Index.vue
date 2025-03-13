<script setup lang="tsx">
import { useHandleData } from '@/hooks/useHandleData'
import PureTable from '@/components/PureTable/PureTable.vue'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { BdDatasourceDTO } from '@/api/bigData/datasource/datasource.interface'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import { addDatasource, editDatasource } from '@/api/bigData/datasource/datasource'
import DatasourceDrawer from '@/views/BigData/Datasource/component/DatasourceDrawer.vue'
import UserDrawer from '@/views/System/User/components/UserDrawer.vue'
import type { FileRequestDTO, SFileDTO } from '@/api/file/file.interface'
import { delFile, directoryList, resourceList, uploadDirectory } from '@/api/file/sFile'
import FileUploadDialog from '@/views/BigData/File/component/FileUploadDialog.vue'


/**
 * treeFilter 数据
 */
const defaultProps = {
	children: 'children',
	label: 'label'
}
const initParam = reactive<FileRequestDTO>({})
const initTreeParam = reactive<FileRequestDTO>({})
const pureTable = ref<PureTableInstance>()
const dialogVisible = ref(false)
/**
 * @description 树形筛选切换
 * @param val {string} 选中的值
 */
const changeTreeFilter = (val: any) => {
	console.log('changeTreeFilter: ', val)
	initParam.relativePath = val.value === '' ? '' : '/' + val.label
}

// 表格配置项
const columns = reactive<ColumnProps<SFileDTO>[]>([
	{ type: 'index', label: '序号', width: 80 },
	{ prop: 'name', label: '文件名', search: { el: 'input' } },
	{ prop: 'size', label: '文件大小' },
	{ prop: 'modifyTime', label: '修改时间', width: 130 },
	{ prop: 'operation', label: '操作', width: 200, fixed: 'right' }
])

// 删除数据源
const deleteFile = async (params: SFileDTO) => {
	console.log(params)
	console.log(initParam)
	let path = ''
	if (initParam.relativePath) {
		path = initParam.relativePath
	}
	path += "/" + params.name
	await useHandleData(delFile, path, `删除【${params.name}】`)
	pureTable.value?.getTableList()
}

// 下载
const download = async (params: SFileDTO) => {
	window.open(params.url)
}

const loadTree = async (node: any, resolve: any) => {
	if (node.level === 0) {
		return resolve([{ value: '', label: '服务器资源' }])
	}
	let tree: any = await directoryList({ relativePath: node.data.value === '' ? '' : '/' + node.data.label })
	if (tree) {
		resolve(tree)
	} else {
		resolve([])
	}
}

const refreshTable = () => {
	pureTable.value?.getTableList()
}

const openDrawer = () => {
	dialogVisible.value = true
}

</script>

<template>
	<div class="main-box">
		<div class="card filter">
			<el-input v-model="initTreeParam.name" placeholder="输入关键字进行过滤" clearable />
			<el-scrollbar :style="{ height: `calc(100% - 56px)` }">
				<el-tree
					:load="loadTree"
					:props="defaultProps"
					@node-click="changeTreeFilter"
					lazy
					:expand-on-click-node="false"
				></el-tree>
			</el-scrollbar>
		</div>
		<div class="table-box">
			<PureTable
				ref="pureTable"
				:indent="20"
				:pagination="false"
				:columns="columns"
				:request-api="resourceList"
				:init-param="initParam"
				:search-col="{ xs: 1, sm: 1, md: 4, lg: 7, xl: 7 }"
			>
				<!-- 表格 header 按钮 -->
				<template #tableHeader>
					<el-button type="primary" @click="openDrawer()">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						文件上传
					</el-button>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" link @click="download(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						下载
					</el-button>
					<el-button type="danger" link @click="deleteFile(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
				</template>
			</PureTable>
			<FileUploadDialog v-model:visible="dialogVisible" :path="initParam.relativePath||''" @refresh-table="refreshTable" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.filter {
	box-sizing: border-box;
	width: 220px;
	height: 100%;
	padding: 18px;
	margin-right: 7px;

	.title {
		margin: 0 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: var(--el-color-info-dark-2);
		letter-spacing: 0.5px;
	}

	.el-input {
		margin: 0 0 15px;
	}

	.el-scrollbar {
		:deep(.el-tree) {
			font-size: var(--pure-el-tree-font-size);
			height: 80%;
			overflow: auto;

			.el-tree-node__content {
				cursor: pointer;
				height: var(--pure-el-tree-node-height);
				line-height: var(--pure-el-tree-node-height);

				.el-icon {
					margin-right: 5px;
				}
			}
		}

		:deep(.el-tree--highlight-current) {
			.el-tree-node.is-current > .el-tree-node__content {
				background-color: var(--el-color-primary);
				border-radius: 3px;

				.el-tree-node__label,
				.el-tree-node__expand-icon {
					color: white;
				}

				.is-leaf {
					color: transparent;
				}
			}
		}
	}
}

</style>
