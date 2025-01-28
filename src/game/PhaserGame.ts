import Phaser from "phaser";
import PreloadScene from "@/game/PreloadScene.ts";
import TileMapNormalScene from "@/game/TileMapNormalScene.ts";
import TileMapImageFullScene from "@/game/TileMapImageFullScene.ts";
import TileMapImageBatchScene from "@/game/TileMapImageBatchScene.ts";

// Funkcia na získanie GET parametra z URL
const getSceneFromUrl = (): string | null => {
	const params = new URLSearchParams(window.location.search);
	return params.get("scene");
};

export const createPhaserGame = (container: HTMLDivElement): Phaser.Game => {
	if (!container) throw new Error("Container not found");

	const width: number = window.innerWidth;
	const height: number = window.innerHeight;
	let dpr: number = window.devicePixelRatio;
	if (dpr > 2.7) {
		dpr = 2.7;
	}
	const widthDPR: number = Math.round(width * dpr);
	const heightDPR: number = Math.round(height * dpr);

	// Dynamicky vyberieme scénu na základe GET parametra
	const sceneKey = getSceneFromUrl();
	let scene = null;

	// Mapovanie scenárov
	const scenesMap: { [key: string]: typeof Phaser.Scene } = {
		TileMapNormalScene,
		TileMapImageFullScene,
		TileMapImageBatchScene
	};

	if (sceneKey && scenesMap[sceneKey]) {
		scene = scenesMap[sceneKey];
	} else {
		console.warn(
			`Scene "${sceneKey}" not found or invalid. Falling back to default.`,
		);
		scene = TileMapNormalScene; // Predvolená scéna
	}

	return new Phaser.Game({
		type: Phaser.WEBGL,
		width: width,
		height: height,
		parent: container,
		scene: [PreloadScene, scene],
		dom: {
			createContainer: true,
		},
		transparent: true,
		render: {
			antialias: false,
			antialiasGL: false,
			powerPreference: "default",
			roundPixels: false,
			mipmapFilter: "NEAREST",
		},
		scale: {
			mode: Phaser.Scale.FIT,
			parent: container,
			width: widthDPR,
			height: heightDPR,
			autoCenter: Phaser.Scale.CENTER_BOTH,
		}
	});
};
