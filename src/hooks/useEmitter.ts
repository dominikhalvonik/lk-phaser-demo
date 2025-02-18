import { TerrainType } from "@/game/entities/config";
import TileEntity from "@/game/entities/TileEntity";
import { type TileEntityCoordinates } from "@/types/tile";
import mitt from "mitt";

export type TileRepositoryUpgradePayload = {
	coordinates: TileEntityCoordinates;
	terrainType: TerrainType | null;
};

export type PhaserPutTileAtPayload = {
	coordinates: TileEntityCoordinates;
};

export enum EmitterEvents {
	// LoadingStart = "Loading/Start",
	// LoadingFinish = "Loading/Finish",
	// LoadingProgress = "Loading/Progress",
	DexieProgress = "Dexie/Progress",
	PhaserPutTileAt = "Phaser/PutTileAt",
	TileRepositoryUpgrade = "Tilerepo/UpgradeEntity",

	// Interactions
	PhaserTileDetailOpen = "Phaser/TileDetailOpen",
	PhaserTileSelect = "Phaser/TileSelect",
	PhaserTileDeselect = "Phaser/TileDeselect",
	PhaserRedirect = "Phaser/Redirect",
}

const emitter = mitt<{
	// [EmitterEvents.LoadingStart]: void;
	// [EmitterEvents.LoadingFinish]: void;
	// [EmitterEvents.LoadingProgress]: number;

	[EmitterEvents.DexieProgress]: number;
	[EmitterEvents.PhaserPutTileAt]: PhaserPutTileAtPayload;
	[EmitterEvents.TileRepositoryUpgrade]: TileRepositoryUpgradePayload;

	[EmitterEvents.PhaserTileDetailOpen]: TileEntity;
	[EmitterEvents.PhaserTileDeselect]: void;
	[EmitterEvents.PhaserTileSelect]: TileEntityCoordinates;
	[EmitterEvents.PhaserRedirect]: void;
}>();

export default (): typeof emitter => emitter;
