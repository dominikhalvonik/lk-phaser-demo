<template>
		<div class="header">
			<select
				class="scene-select"
				v-model="selectedScene"
				@change="handleSceneChange"
			>
				<option value="TileMapNormalScene">TileMapNormalScene</option>
				<option value="TileMapImageFullScene">TileMapImageFullScene</option>
				<option value="TileMapImageBatchScene">TileMapImageBatchScene</option>
			</select>
		</div>
		<Version v-if="isDev" />
		<PhaserGame />
</template>

<script lang="ts" setup>
import PhaserGame from "@/components/PhaserGame.vue";
import Version from "@/components/Version.vue";
import { onMounted, ref } from "vue";

const isDev = import.meta.env.DEV;

// Vytvoríme reaktívnu premennú pre aktuálne vybranú scénu
const selectedScene = ref<string>("TileMapNormalScene"); // Predvolená hodnota

// Funkcia na načítanie hodnoty GET parametra
const getSceneFromUrl = (): string | null => {
	const params = new URLSearchParams(window.location.search);
	return params.get("scene");
};

// Nastavenie hodnoty `selectedScene` pri načítaní komponentu
onMounted(() => {
	const scene = getSceneFromUrl();
	if (scene) {
		selectedScene.value = scene;
	}
});

// Funkcia na spracovanie zmeny hodnoty v select boxe
const handleSceneChange = (): void => {
	// Aktualizácia URL s GET parametrom
	const currentUrl = new URL(window.location.href);
	currentUrl.searchParams.set("scene", selectedScene.value);

	// Presmerovanie na novú URL (refresh stránky)
	window.location.href = currentUrl.toString();
};
</script>

<style lang="scss" scoped>
/* Wrapper pre PiniaReference a select */
.header {
	display: flex;
	justify-content: center; /* Horizontálne vycentrovanie */
	align-items: center; /* Vertikálne zarovnanie (v rámci headeru) */
	gap: 1rem; /* Medzera medzi prvkami */
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Jemný tieň pre header */
	background-color: #f8f9fa; /* Jemné pozadie headeru pre odlíšenie */
	padding: 0 1rem; /* Padding okolo obsahu */
	height: 4rem; /* Výška headeru */
}

/* Štýly pre select */
.scene-select {
	cursor: pointer;
	border: 1px solid #ccc;
	border-radius: 4px;
	background-color: #fff;
	padding: 0.5rem;
	color: #333;
	font-size: 1rem;
}

.scene-select:focus {
	outline: none;
	box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
	border-color: #007bff;
}

.scene-select option {
	font-size: 1rem;
}
</style>
