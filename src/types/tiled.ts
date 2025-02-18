export type TiledConfigLayer = {
	data: Array<number>;
	height: number;
	id: number;
	name: string;
	opacity: number;
	type: "tilelayer";
	visible: boolean;
	width: number;
	x: number;
	y: number;
};

export type TiledConfigTilesetTile = {
	id: number;
	properties: Array<{
		name: string;
		type: "string";
		value: string;
	}>;
};

export type TiledConfigTileset = {
	columns: number;
	firstgid: number;
	image: string;
	imageheight: number;
	imagewidth: number;
	margin: number;
	name: string;
	spacing: number;
	tilecount: number;
	tileheight: number;
	tiles: Array<TiledConfigTilesetTile>;
	tilewidth: number;
};

export type TiledConfig = {
	compressionlevel: number;
	height: number;
	infinite: boolean;
	layers: Array<TiledConfigLayer>;
	nextlayerid: number;
	nextobjectid: number;
	orientation: "orthogonal";
	renderorder: "right-down";
	tileheight: number;
	tilesets: Array<TiledConfigTileset>;
	tilewidth: number;
	type: "map";
	version: number;
	width: number;
};
