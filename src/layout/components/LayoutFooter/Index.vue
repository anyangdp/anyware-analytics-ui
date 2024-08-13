<script setup lang="ts">
const title = import.meta.env.VITE_APP_TITLE
</script>

<template>
	<div class="layout-footer-container">Copyright <pure-icon name="pi-ant-design:copyright-outlined" />2024 {{ title }}</div>
</template>

<style scoped lang="scss">
.layout-footer-container {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: var(--pure-app-footer-height);
	padding: 0 20px;
	font-size: 14px;
	color: rgb(0 0 0 / 45%);
	background: var(--el-color-white);
	border-top: 1px dashed #dcdfe6;

	.el-icon {
		margin: 5px;
	}
}
</style>
