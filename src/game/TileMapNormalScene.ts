import Phaser from "phaser";
import GameObject = Phaser.GameObjects.GameObject;

class TileMapNormalScene extends Phaser.Scene {
    private tileMap: Phaser.Tilemaps.Tilemap | null = null;
    private camera: Phaser.Cameras.Scene2D.Camera | null = null;
    private isDragging: boolean = false;
    private dragStartX: number = 0;
    private dragStartY: number = 0;
    private rows: number = 1024;
    private cols: number = 1024;
    private tileSize: number = 256;

    constructor() {
        super({
            key: "TileMapNormalScene",
        });
    }

    create(): void {
        this.camera = this.cameras.main;
        this.createTileMap()
        this.setupCameraControls()
        this.centerCamera()
    }

    createTileMap(): void {
        const frameNames = this.textures.get("ondro-256-atlas").getFrameNames();
        const firstFrame = this.textures.getFrame("ondro-256-atlas", frameNames[0]);

        const rows = this.rows;
        const cols = this.cols;
        const tileSize = this.tileSize;

        this.tileMap = this.make.tilemap({
            width: cols,
            height: rows,
            tileWidth: tileSize,
            tileHeight: tileSize,
        });

        const tileset = this.tileMap.addTilesetImage(
            "ondro-256-atlas",
            undefined,
            tileSize,
            firstFrame.height
        );

        const layer = this.tileMap.createBlankLayer("lk-ondro-256-layer1", tileset!);

        layer?.forEachTile((tile) => {
            const randomFrameName = Phaser.Utils.Array.GetRandom(frameNames);
            const frame = this.textures.getFrame("ondro-256-atlas", randomFrameName);
            if (!frame) return;
            tile.index = frameNames.indexOf(randomFrameName);
        });

        this.addTileClickListener(layer!);
    }

    addTileClickListener(layer: Phaser.Tilemaps.TilemapLayer): void {
        this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            const tile = layer.getTileAtWorldXY(pointer.worldX, pointer.worldY);

            if (tile) {
                console.log(`Clicked tile at X: ${tile.x}, Y: ${tile.y}`);
            } else {
                console.log("No tile found at clicked location.");
            }
        });
    }

    setupCameraControls(): void {
        this.camera = this.cameras.main;
        if (!this.tileMap) return;

        this.camera.setBounds(0, 0, this.tileMap.widthInPixels, this.tileMap.heightInPixels);

        this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            if (pointer.leftButtonDown()) {
                this.isDragging = true;
                this.dragStartX = pointer.x;
                this.dragStartY = pointer.y;
            }
        });

        this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
            if (this.isDragging && this.camera) {
                const dragX = this.dragStartX - pointer.x;
                const dragY = this.dragStartY - pointer.y;

                const speedMultiplier = 1 / this.camera.zoom;

                this.camera.scrollX += dragX * speedMultiplier;
                this.camera.scrollY += dragY * speedMultiplier;

                this.dragStartX = pointer.x;
                this.dragStartY = pointer.y;
            }
        });

        this.input.on("pointerup", () => {
            this.isDragging = false;
        });

        this.input.on("wheel", (pointer: Phaser.Input.Pointer, _gameObjects: GameObject, deltaX: number, deltaY: number) => {
            if (this.camera) {
                const zoomFactor = 0.01;
                if (deltaY > 0) {
                    this.camera.zoom = Math.max(this.camera.zoom - zoomFactor, 0.01);
                } else {
                    this.camera.zoom = Math.min(this.camera.zoom + zoomFactor, 10);
                }
            } else {
                console.log(pointer, _gameObjects, deltaX, deltaY)
            }
        });
    }

    centerCamera(): void {
        if (this.camera && this.tileMap) {
            const centerX = (this.tileMap.widthInPixels - this.camera.width) / 2;
            const centerY = (this.tileMap.heightInPixels - this.camera.height) / 2;
            this.camera.scrollX = centerX;
            this.camera.scrollY = centerY;
        }
    }
}

export default TileMapNormalScene;
