import Phaser from "phaser";
// @ts-expect-error - missing types
import CameraControllerPlugin from "phaser3-rex-plugins/dist/rexcameracontrollerplugin.js";
import MainMapScene from "./MainMapScene";

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

	return new Phaser.Game({
		type: Phaser.WEBGL,
		width: width,
		height: height,
		parent: container,
		scene: [MainMapScene],
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
		},
		plugins: {
			global: [
				{
					key: "rexCameraController",
					plugin: CameraControllerPlugin,
					start: true,
				},
			],
		},
	});
};
