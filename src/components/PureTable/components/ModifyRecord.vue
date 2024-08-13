<script setup lang="ts">
import type { ModifyRecord } from '@/components/PureTable/types/pureTable.type'

const props = defineProps<{
	data: ModifyRecord
}>()
</script>

<template>
	<el-popover placement="bottom" width="280" trigger="hover">
		<template #reference>
			<el-text type="primary" class="cursor-default">
				<pure-icon name="pi-carbon:information-filled" style="top: 2px; left: 2px; margin: 0 6px 0 0"></pure-icon>详情
			</el-text>
		</template>
		<el-descriptions direction="vertical" :column="2" border>
			<el-descriptions-item width="140">
				<template #label>
					<el-text> <pure-icon name="pi-carbon:user-follow"></pure-icon> 创建者 </el-text>
				</template>
				<el-tag>{{ props.data.createUserName ?? '无' }}</el-tag>
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<el-text> <pure-icon name="pi-carbon:calendar"></pure-icon> 创建时间 </el-text>
				</template>
				<el-tag>{{ props.data.createTime ?? '无' }}</el-tag>
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<el-text> <pure-icon name="pi-carbon:user-profile"></pure-icon> 修改者 </el-text>
				</template>
				<el-tag>{{ props.data.updateUserName ?? '无' }}</el-tag>
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<el-text> <pure-icon name="pi-carbon:calendar"></pure-icon> 修改时间 </el-text>
				</template>
				<el-tag>{{ props.data.updateTime ?? '无' }}</el-tag>
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<el-text> <pure-icon name="pi-carbon:text-long-paragraph"></pure-icon> 备注 </el-text>
				</template>
				{{ props.data.remark ?? '无' }}
			</el-descriptions-item>
		</el-descriptions>
	</el-popover>
</template>

<style scoped lang="scss"></style>
