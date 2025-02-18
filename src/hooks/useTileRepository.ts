import TileRepository from "@/game/TileRepository";
import TileEntity from "@/game/entities/TileEntity";

let tr: TileRepository;

export default (
	...options: ConstructorParameters<typeof TileRepository>
): TileRepository => {
	if (tr) return tr;

	TileEntity.isMounted = false;
	tr = new TileRepository(...options);
	TileEntity.isMounted = true;

	// @ts-expect-error - missing type in window
	if (import.meta.env.DEV) window.tr = tr;

	return tr;
};
