<template>
	<div class="version-tag">v{{ version }}</div>
</template>

<script lang="ts" setup>
const version = window.__APP_VERSION__;
</script>

<style lang="scss" scoped>
.version-tag {
	position: fixed;
	top: 1rem;
	right: 1rem;
	border-radius: 0.25rem;
	background-color: rgba(0, 0, 0, 0.8);
	padding: 0.25rem 0.5rem;
	color: #f8f8f8;
	font-size: 0.875rem;
	font-family: monospace;
	user-select: none;
}
</style>
