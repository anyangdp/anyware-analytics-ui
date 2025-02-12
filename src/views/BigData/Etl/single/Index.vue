<script setup lang="tsx">
import { useHandleData } from '@/hooks/useHandleData'
import PureTable from '@/components/PureTable/PureTable.vue'
import { appActiveDic } from '@/recursos/dictionaries/app.dictionary'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import {
	addEtlTaskInfo,
	delEtlTaskInfo,
	editEtlTaskInfo,
	executeEtlTask,
	getEtlTaskInfoPage
} from '@/api/bigData/etl/etl'
import { ETL_TASK_TYPE } from '@/recursos/constantes/bigdata.constant'
import type { BdEtlTaskInfoDTO } from '@/api/bigData/etl/etl.interface'
import EtlTaskInfoDrawer from '@/views/BigData/Etl/single/component/EtlTaskInfoDrawer.vue'
import VueJsonPretty from 'vue-json-pretty'
import { WebSocketClient } from '@/utils/stompClient'
import type { WebSocketMessage } from '@/api/websocket/ws.interface'

// PureTable 实例
const initParam = reactive({
	type: 'SINGLE_BATCH_TASK'
})
const pureTable = ref<PureTableInstance>()
const json = ref()
// 表格配置项
const columns = reactive<ColumnProps<BdEtlTaskInfoDTO>[]>([
	{ type: 'index', label: '序号', width: 80 },
	{ prop: 'id', label: '任务id', width: 150, search: { el: 'input' } },
	{ prop: 'description', label: '任务说明', search: { el: 'input' } },
	{ prop: 'active', label: '状态', width: 120, tag: true, enum: appActiveDic, search: { el: 'select-v2' } },
	{ prop: 'createdAt', label: '创建时间' },
	{ prop: 'updatedAt', label: '更新时间' },
	{ prop: 'operation', label: '操作', width: 300, fixed: 'right' }
])
let webSocketClient: WebSocketClient | null = null
let messages = ref<WebSocketMessage[]>([])
// 删除数据源
const deleteEtlTask = async (params: BdEtlTaskInfoDTO) => {
	await useHandleData(delEtlTaskInfo, params.id, `删除【${params.description}】`)
	pureTable.value?.getTableList()
}

// 打开 drawer（新增、修改、查看）
const drawerRef = ref<InstanceType<typeof EtlTaskInfoDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<BdEtlTaskInfoDTO> = { active: true, type: 'SINGLE_BATCH_TASK' }) => {
	const params: DrawerProps<BdEtlTaskInfoDTO> = {
		title,
		isView: title === '查看',
		row: { ...row },
		api: title === '新增' ? addEtlTaskInfo : title === '编辑' ? editEtlTaskInfo : undefined,
		getTableList: pureTable.value?.getTableList
	}
	drawerRef.value?.acceptParams(params)
}
let centerDialogVisible = ref(false)
const showCode = (row) => {
	centerDialogVisible.value = true
	json.value = JSON.parse(row!.configuration)
}

let etlExecuteDialogVisible = ref(false)

const execute = async (row) => {
	etlExecuteDialogVisible.value = true
	// 创建 stompClient 实例
	webSocketClient = new WebSocketClient('ws://localhost:9201/ws/etlJob') // 替换为实际 WebSocket URL
	// webSocketClient = new WebSocketClient('http://localhost:9201/ws/etlJob'); // 替换为实际 WebSocket URL
	webSocketClient.connect(
		() => {
			console.log('Connected to WebSocket')
			// 动态订阅地址
			webSocketClient?.subscribe('/etlJob/' + row.id + '/realTime/log', handleMessage)
		},
		(error) => {
			console.error('WebSocket connection error:', error)
		}
	)
	await executeEtlTask(row.id)
}
onUnmounted(() => {
	// 页面卸载时断开 WebSocket 连接
	disconnect()
})
// 处理接收到的消息
const handleMessage = (message: WebSocketMessage) => {
	console.log('Received message:', message)
	messages.value.push(message) // 更新消息列表
}
const closeExecute = () => {
	etlExecuteDialogVisible.value = false
	messages.value.length = 0
	disconnect()
}
const disconnect = () => {
	webSocketClient?.disconnect()
	console.log('Disconnected from WebSocket')
}
</script>

<template>
	<div class="main-box">
		<div class="table-box">
			<PureTable
				ref="pureTable"
				:columns="columns"
				:request-api="getEtlTaskInfoPage"
				:init-param="initParam"
				:search-col="{ xs: 1, sm: 1, md: 2, lg: 6, xl: 6 }"
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
					<el-button type="primary" link @click="execute(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:caret-right"></pure-icon>
						</template>
						执行一次
					</el-button>
					<el-button type="primary" link @click="openDrawer('编辑', scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						编辑
					</el-button>
					<el-button type="primary" link @click="showCode(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:code"></pure-icon>
						</template>
						脚本
					</el-button>
					<el-button type="danger" link @click="deleteEtlTask(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
				</template>
			</PureTable>
			<EtlTaskInfoDrawer ref="drawerRef" />
		</div>
		<el-dialog
			title="etl配置"
			v-model="centerDialogVisible"
			width="30%"
			destroy-on-close
			center
		>
			<span><vue-json-pretty :data="json" :editable="false" /></span>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="centerDialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="centerDialogVisible = false"
					>确 定</el-button
					>
				</span>
			</template>
		</el-dialog>
		<el-dialog
			title="etl任务"
			v-model="etlExecuteDialogVisible"
			width="30%"
			destroy-on-close
			center
		>
			<el-timeline>
				<el-timeline-item
					v-for="(message, index) in messages"
					:key="index"
					:timestamp="message.timestamp"
					:hollow="true"
					:type="message.type === 'ERROR'? 'danger' : 'primary'"
				>
					{{message.content}}
				</el-timeline-item>
			</el-timeline>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="closeExecute"
					>关 闭</el-button
					>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped lang="scss"></style>
