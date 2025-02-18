let isAstcSupportedCache: boolean | null = null;

export const isAstcSupported = (): boolean => {
	if (isAstcSupportedCache === null) {
		isAstcSupportedCache = !!document
			.createElement("canvas")
			.getContext("webgl")
			?.getExtension("WEBGL_compressed_texture_astc");
	}
	return isAstcSupportedCache;
};
