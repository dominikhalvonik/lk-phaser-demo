<template>
	<div v-if="isError" class="error-overlay">
		<div class="error-content">
			<h1>Error</h1>
			<p>{{ text }}</p>
			<button type="button" @click.prevent="text = null">Continue</button>
		</div>
	</div>
	<slot v-if="slots.default" />
</template>

<script lang="ts" setup>
import { computed, onErrorCaptured, ref, useSlots } from "vue";

// @ts-expect-error - TS7022
const slots = useSlots();

const text = ref<string | null>(null);
const isError = computed((): boolean => !!text.value);

onErrorCaptured((error: Error): void => {
	text.value = error.toString();
});
</script>

<style lang="scss" scoped>
.error-overlay {
	@include flex-col-center;
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.9);
	width: 100%;
	height: 100%;

	.error-content {
		@include flex-col-center;
		@include space-v(1rem);
		border-radius: 1rem;
		background-color: indianred;
		padding: 1.5rem;
		color: white;
		font-weight: 500;
		text-align: center;

		h1 {
			font-size: 1.25rem;
		}

		p {
			font-size: 1rem;
		}

		button {
			transition: background-color 0.125s;
			cursor: pointer;
			border: 0.125rem solid white;
			border-radius: 0.5rem;
			background-color: transparent;
			padding: 0.5rem 1rem;
			color: white;
			font-size: 1rem;

			&:hover {
				background-color: rgba(255, 255, 255, 0.1);
			}
		}
	}
}
</style>
