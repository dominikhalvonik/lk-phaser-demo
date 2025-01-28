import mitt from "mitt";
import Phaser from "phaser";

export enum EmitterEvents {
	PhaserPutTileAt = "Phaser/PutTileAt",
	// Interactions
	PhaserTileDetailOpen = "Phaser/TileDetailOpen",
	PhaserTileSelect = "Phaser/TileSelect",
	PhaserTileDeselect = "Phaser/TileDeselect",
	PhaserRedirect = "Phaser/Redirect",
}

export type PhaserPutTileAtEventPayload = null;

const emitter = mitt<{
	[EmitterEvents.PhaserPutTileAt]: PhaserPutTileAtEventPayload;
	[EmitterEvents.PhaserTileDetailOpen]: Phaser.Tilemaps.Tile;
	[EmitterEvents.PhaserTileDeselect]: void;
	[EmitterEvents.PhaserTileSelect]: {
		x: number;
		y: number;
	};
	[EmitterEvents.PhaserRedirect]: void;
}>();

export default (): typeof emitter => emitter;
