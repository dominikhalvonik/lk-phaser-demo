import { TerrainType } from "../config";
import TileEntity from "../TileEntity";

class MerchantShipSalvageableTileEntity extends TileEntity {
	public static readonly terrainType = TerrainType.MERCHANT_SHIP;
}

export default MerchantShipSalvageableTileEntity;
