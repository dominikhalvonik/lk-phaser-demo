<template>
	<div ref="game-container" />
</template>

<script lang="ts" setup>
import useEmitter, { EmitterEvents } from "@/hooks/useEmitter";
import router from "@/router";
import { createPhaserGame } from "@/game/PhaserGame";
import { onBeforeUnmount, onMounted, useTemplateRef } from "vue";

const emitter = useEmitter();

const containerRef = useTemplateRef<HTMLDivElement>("game-container");

onMounted((): void => {
	if (!containerRef.value) throw new Error("Container not found");
	if (window.__PHASER_GAME__) throw new Error("Game already initialized");

	window.__PHASER_GAME__ = createPhaserGame(containerRef.value);

	// Emitter for handling game interaction events
	emitter.on(
		EmitterEvents.PhaserTileDetailOpen,
		(tile: Phaser.Tilemaps.Tile): void => {
			router.push({ name: "Tile", params: { x: tile.x, y: tile.y } });
		},
	);

	emitter.on(EmitterEvents.PhaserRedirect, (): void => {
		router.push({ name: "LayoutView" });
	});
});

onBeforeUnmount((): void => {
	if (!window.__PHASER_GAME__) return;

	window.__PHASER_GAME__.destroy(true);
	window.__PHASER_GAME__ = null;
});
</script>

<style lang="scss" scoped></style>
