export type TexturePackerConfigTextureFrame = {
	filename: string;
	rotated: boolean;
	trimmed: boolean;
	sourceSize: {
		w: number;
		h: number;
	};
	spriteSourceSize: {
		x: number;
		y: number;
		w: number;
		h: number;
	};
	frame: {
		x: number;
		y: number;
		w: number;
		h: number;
	};
};

export type TexturePackerConfigTexture = {
	image: string;
	format: string;
	size: {
		w: number;
		h: number;
	};
	scale: number;
	frames: Array<TexturePackerConfigTextureFrame>;
};

export type TexturePackerConfig = {
	textures: Array<TexturePackerConfigTexture>;
	meta: {
		app: string;
		version: string;
		smartupdate: string;
	};
};
