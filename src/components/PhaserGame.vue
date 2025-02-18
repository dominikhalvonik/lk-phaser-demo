<template>
  <div ref="game-container" />
  <button @click="toggleUrl" class="toggle">TOGGLE MAP</button>
  <RouterView />
</template>

<script lang="ts" setup>
import { createPhaserGame } from "@/game/PhaserGame";
import useEmitter, { EmitterEvents } from "@/hooks/useEmitter";
import router from "@/router";
// import Phaser from "phaser";
import TileEntity from "@/game/entities/TileEntity";
import { onBeforeUnmount, onMounted, useTemplateRef } from "vue";
import { RouterView } from "vue-router";

const emitter = useEmitter();

const containerRef = useTemplateRef<HTMLDivElement>("game-container");

const toggleUrl = (): void => {
  const url = new URL(window.location.href);
  if (url.searchParams.has("all")) {
    url.searchParams.delete("all");
  } else {
    url.searchParams.set("all", "true");
  }
  window.location.href = url.toString();
};

onMounted((): void => {
  if (!containerRef.value) throw new Error("Container not found");
  if (window.__PHASER_GAME__) throw new Error("Game already initialized");

  window.__PHASER_GAME__ = createPhaserGame(containerRef.value);

  // Emitter for handling game interaction events
  emitter.on(EmitterEvents.PhaserTileDetailOpen, (tile: TileEntity): void => {
    if (!tile) return;
    router.push({ name: "Tile", params: { x: tile.x, y: tile.y } });
  });

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

<style lang="scss" scoped>
.toggle {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  padding: 0.125rem 0.25rem;
}
</style>
