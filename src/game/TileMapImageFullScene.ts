import Phaser from "phaser";
import GameObject = Phaser.GameObjects.GameObject;

class TileMapImageFullScene extends Phaser.Scene {
    private camera: Phaser.Cameras.Scene2D.Camera | null = null;
    private isDragging: boolean = false;
    private dragStartX: number = 0;
    private dragStartY: number = 0;
    private rows: number = 256;
    private cols: number = 256;
    private tileSize: number = 256;

    constructor() {
        super({
            key: "TileMapImageFullScene",
        });
    }

    create(): void {
        this.camera = this.cameras.main;
        this.createCustomTileMap();
        this.setupCustomCameraControls();
        this.centerCustomCamera();
    }

    createCustomTileMap(): void {
        const frameNames = this.textures.get("ondro-256-atlas").getFrameNames();

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const randomFrameName = Phaser.Utils.Array.GetRandom(frameNames);

                const x = col * this.tileSize + this.tileSize / 2;
                const y = row * this.tileSize + this.tileSize / 2;
                this.add.image(x, y, "ondro-256-atlas", randomFrameName);
            }
        }

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            const col = Math.floor(pointer.x / this.tileSize);
            const row = Math.floor(pointer.y / this.tileSize);
            console.log(`Kliknuté na dlaždicu: Riadok ${row}, Stĺpec ${col}`);
        });
    }

    setupCustomCameraControls(): void {
        this.camera = this.cameras.main;

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

    centerCustomCamera(): void {
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

export default TileMapImageFullScene;
