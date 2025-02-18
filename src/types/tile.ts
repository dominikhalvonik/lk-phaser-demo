export type TileEntityCoordinates = {
	x: number;
	y: number;
};

export type TileEntityParams = {
	currentAnimationIndex: Uint8Array;
	clicks: Uint32Array;
	durability: Uint16Array;
	visibility?: Uint8Array;
	distanceFromMainSettlement: Uint16Array;
};

export type TileEntityParams1 = Pick<
	TileEntityParams,
	"clicks" | "durability" | "visibility" | "distanceFromMainSettlement"
>;

export type TileEntityParams3 = Pick<
	TileEntityParams,
	"currentAnimationIndex" | "clicks"
>;

export type TileEntityParams5 = Pick<TileEntityParams, "clicks">;

export type TileEntityParamsApi = {
	getParamByName: (name: keyof Partial<TileEntityParams>) => number;
	setParamByName: (
		name: keyof Partial<TileEntityParams>,
		value: number,
	) => void;
};
