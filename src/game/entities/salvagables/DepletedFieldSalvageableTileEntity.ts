import { TerrainType } from "../config";
import TileEntity from "../TileEntity";

class DepletedFieldSalvageableTileEntity extends TileEntity {
	public static readonly terrainType = TerrainType.DEPLETED_FIELD;
}

export default DepletedFieldSalvageableTileEntity;
