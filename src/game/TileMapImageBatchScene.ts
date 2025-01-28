import Phaser from "phaser";
import Tile = Phaser.Tilemaps.Tile;
import GameObject = Phaser.GameObjects.GameObject;

class TileMapImageBatchScene extends Phaser.Scene {
    private camera: Phaser.Cameras.Scene2D.Camera | null = null;
    private isDragging: boolean = false;
    private dragStartX: number = 0;
    private dragStartY: number = 0;
    private rows: number = 1024;
    private cols: number = 1024;
    private tileSize: number = 256;
    private visibleTiles: Map<any, any> = new Map<string, Phaser.GameObjects.Image>();
    private updateVisibleTiles: any;

    constructor() {
        super({
            key: "TileMapImageBatchScene",
        });
    }

    create(): void {
        this.camera = this.cameras.main;
        this.createBatchCustomTileMap()
        this.setupBatchCustomCameraControls()
        this.centerBatchCustomCamera()
    }

    createBatchCustomTileMap(): void {
        const frameNames = this.textures.get("ondro-256-atlas").getFrameNames();
        const updateVisibleTiles = () => {
            if(this.camera) {
                const startCol = Math.floor(this.camera.worldView.x / this.tileSize);
                const endCol = Math.ceil((this.camera?.worldView.x + this.camera.worldView.width) / this.tileSize);
                const startRow = Math.floor(this.camera.worldView.y / this.tileSize);
                const endRow = Math.ceil((this.camera.worldView.y + this.camera.worldView.height) / this.tileSize);

                const newVisibleTiles = new Map<string, Phaser.GameObjects.Image>();

                for (let row = startRow; row < endRow; row++) {
                    for (let col = startCol; col < endCol; col++) {
                        if (row < 0 || col < 0 || row >= this.rows || col >= this.cols) continue;

                        const key = `${row},${col}`;
                        if (!this.visibleTiles.has(key)) {
                            const randomFrameName = Phaser.Utils.Array.GetRandom(frameNames);
                            const x = col * this.tileSize + this.tileSize / 2;
                            const y = row * this.tileSize + this.tileSize / 2;

                            const tile = this.add.image(x, y, "ondro-256-atlas", randomFrameName);
                            this.visibleTiles.set(key, tile);
                        }

                        newVisibleTiles.set(key, this.visibleTiles.get(key)!);
                    }
                }

                this.visibleTiles.forEach((tile: Tile, key: string) => {
                    if (!newVisibleTiles.has(key)) {
                        tile.destroy();
                    }
                });

                this.visibleTiles = newVisibleTiles;
            }
        };

        this.updateVisibleTiles = updateVisibleTiles;

        updateVisibleTiles();
    }

    update(): void {
        if (this.updateVisibleTiles) {
            this.updateVisibleTiles();
        }
    }

    setupBatchCustomCameraControls(): void {
        if(this.camera) {
            const sceneWidth = this.cols * this.tileSize;
            const sceneHeight = this.rows * this.tileSize;

            this.camera.setBounds(0, 0, sceneWidth, sceneHeight);

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
    }

    centerBatchCustomCamera(): void {
        if (this.camera) {
            const sceneWidth = this.cols * this.tileSize;
            const sceneHeight = this.rows * this.tileSize;

            const centerX = (sceneWidth - this.camera.width) / 2;
            const centerY = (sceneHeight - this.camera.height) / 2;
            this.camera.scrollX = centerX;
            this.camera.scrollY = centerY;
        }
    }
}

export default TileMapImageBatchScene;
