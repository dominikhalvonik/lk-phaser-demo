import useEmitter, {
    EmitterEvents,
    PhaserPutTileAtPayload,
} from "@/hooks/useEmitter";
import useTileRepository from "@/hooks/useTileRepository";
import { type TexturePackerConfigTextureFrame } from "@/types/texture-packer";
import { isAstcSupported } from "@/utils/textures";
import Phaser from "phaser";
import { TerrainType } from "./entities/config";
import TileEntity from "./entities/TileEntity";
import { type TileRepositoryLayerIndex } from "./TileRepository";

interface SuperMember {
    index: number;
    member: Partial<Phaser.Types.GameObjects.SpriteGPULayer.Member> | null;
    layerIndex: number;
}

type TexureConfigDataImg = {
    img: { multiAtlasURL: string };
};

type TexureConfigDataAstc = {
    astc: { type: string; multiAtlasURL: string };
};

type TextureConfig = {
    name: string;
    data: TexureConfigDataImg | TexureConfigDataAstc;
};

// TODO: Remove this temporary boolean for toggle
const isVisibleAll = new URLSearchParams(window.location.search).has("all");

const CDN_URL =
    "https://appspowerplaymanager.vshcdn.net/images/lost-kingdom/LKTexturePackerExport";

const TILESET_NAME_REGEXP =
    /(?<name>tileset_\d{4}(?:_square)?)(?:_v\d+)?(?:-\w+)?\.json$/;
const NUMBER_REGEXP = /(?<number>\d+)/;

class MainMapScene extends Phaser.Scene {
    private lastClickedTile: TileEntity | null = null;
    private graphics: Phaser.GameObjects.Graphics | null = null;
    private camera: Phaser.Cameras.Scene2D.Camera | null = null;
    private isDragging: boolean = false;
    private dragStartPoint: Phaser.Math.Vector2 = new Phaser.Math.Vector2();
    private cameraStartPoint: Phaser.Math.Vector2 = new Phaser.Math.Vector2();

    private readonly tilerepo: ReturnType<typeof useTileRepository>;
    private readonly emitter: ReturnType<typeof useEmitter>;

    private readonly layers: Array<Phaser.GameObjects.SpriteGPULayer> = [];
    private readonly allAtlasUrls: Array<string> = isAstcSupported()
        ? [
            `${CDN_URL}/PVRs/tileset_1000_square_v1.json`,
            `${CDN_URL}/PVRs/tileset_1000_v1.json`,
        ]
        : [
            `${CDN_URL}/PNGs/tileset_1000_square_v1.json`,
            `${CDN_URL}/PNGs/tileset_1000_v1.json`,
        ];
    private readonly atlasUrlToAtlasNamesCache = new Map<string, string>();
    private readonly frameNameToLayerCache: Array<Set<TerrainType>> = [];
    private readonly tallFrameNamesCache: Set<TerrainType> =
        new Set<TerrainType>();

    private readonly fogRadius: number = 3; // TODO move to tileRepo + functionality
    private readonly visibilityType = {
        BLACK: 0,
        FOG: 1,
        EXPLORED: 2,
    };

    constructor() {
        super({
            key: "MainMapScene",
        });

        this.tilerepo = useTileRepository();
        this.emitter = useEmitter();
    }

    public preload(): void {
        this.getAtlasConfig().forEach((config: TextureConfig): void => {
            if (this.textures.exists(config.name)) return;

            // @ts-expect-error - wrong types
            this.load.texture(config.name, config.data);
        });
    }

    public create(): void {
        this.createAtlasFrameNamesCache();
        // this.createTileMapNew();
        this.createTileMap();

        this.setupSceneCamera();
        this.setCameraController();

        this.addClickHandler();

        this.initEmitters();
    }

    initEmitters(): void {
        this.emitter.on(
            EmitterEvents.PhaserTileSelect,
            ({ x, y }: { x: number; y: number }): void => {
                const tile = this.tilerepo.getTileAt({
                    x,
                    y,
                });
                if (!tile) return;

                this.selectTile(tile);
            },
        );

        this.emitter.on(EmitterEvents.PhaserTileDeselect, (): void => {
            this.deselectTile();
        });

        this.emitter.on(
            EmitterEvents.PhaserPutTileAt,
            ({ coordinates }: PhaserPutTileAtPayload): void => {
                const idx =
                    this.tilerepo.getTileIndexByCoordinates(coordinates);
                this.rerenderTile(idx);
            },
        );
    }

    private getAtlasNameByAtlasUrl(atlasUrl: string): string {
        if (!this.atlasUrlToAtlasNamesCache.has(atlasUrl)) {
            const name =
                atlasUrl.match(TILESET_NAME_REGEXP)?.groups?.name ?? "";
            this.atlasUrlToAtlasNamesCache.set(atlasUrl, name);
        }
        return this.atlasUrlToAtlasNamesCache.get(atlasUrl)!;
    }

    private getAtlasConfig(): Array<TextureConfig> {
        return this.allAtlasUrls.map(
            (atlasUrl: string): TextureConfig =>
                isAstcSupported()
                    ? {
                        name: this.getAtlasNameByAtlasUrl(atlasUrl),
                        data: {
                            astc: {
                                type: "PVR",
                                multiAtlasURL: atlasUrl,
                            },
                        },
                    }
                    : {
                        name: this.getAtlasNameByAtlasUrl(atlasUrl),
                        data: {
                            img: {
                                multiAtlasURL: atlasUrl,
                            },
                        },
                    },
        );
    }

    private getNumber(string: string): number {
        return +(string.match(NUMBER_REGEXP)?.groups?.number ?? 0);
    }

    private createAtlasFrameNamesCache(): void {
        Object.keys(this.textures.list)
            // Musime to mat zosortovane rovnako, ako mame v this.allAtlasUrls - teda 1000_squares, 1000, 2000_squares, 2000, ...
            .sort((a: string, b: string): number => {
                const numA = this.getNumber(a);
                const numB = this.getNumber(b);
                if (numA !== numB) return numA - numB;
                return a.endsWith("_square") ? -1 : 1;
            })
            .forEach((key: string): void => {
                if (key.startsWith("__")) return;

                const isSquare = key.endsWith("_square");
                const frameNameSet = new Set<TerrainType>();

                const { frames } = (
                    this.textures.list as Record<
                        string,
                        {
                            frames: Array<TexturePackerConfigTextureFrame>;
                        }
                    >
                )[key];

                Object.keys(frames).forEach((key: string): void => {
                    if (key.startsWith("__")) return;

                    const name = key as TerrainType;
                    frameNameSet.add(name);

                    if (!isSquare) this.tallFrameNamesCache.add(name);
                });

                this.frameNameToLayerCache.push(frameNameSet);
            });
    }

    private createTileMap(): void {
        this.frameNameToLayerCache.forEach(
            (atlas: Set<TerrainType>, index: number): void => {
                const atlasUrl = this.allAtlasUrls[index];
                const tilerepoLayerIndex = Math.trunc(
                    this.getNumber(atlasUrl) / 1e3,
                ) as TileRepositoryLayerIndex;

                // TODO: Remove this temporary boolean for toggle
                const spriteGPULayerSize = isVisibleAll
                    ? this.tilerepo.getLayerSizeByFrameNamesForPhaser(
                        tilerepoLayerIndex,
                        atlas,
                    )
                    : this.tilerepo.getNonBlackTileCount();

                const layer = this.add.spriteGPULayer(
                    this.getAtlasNameByAtlasUrl(atlasUrl),
                    spriteGPULayerSize,
                );
                this.layers.push(layer);
            },
        );

        for (let i = 0; i < this.tilerepo.size; i++) {
            const { x, y } = this.tilerepo.getTileCoordinatesByIndex(i);

            // TODO: Remove this temporary boolean for toggle
            if (isVisibleAll) {
                this.rerenderTile(i);
                continue;
            }

            const tile = this.tilerepo.getTileAt({
                x,
                y,
            });

            if (!tile) continue;

            const tileParams = this.tilerepo.getTileEntitiesByIndex(tile?.id);

            if (!tileParams[0]) continue;

            const tileVisibility =
                tileParams[0].api.getParamByName("visibility") ?? 0;

            if (tileVisibility === this.visibilityType.EXPLORED) {
                this.rerenderTile(i);
            } else if (tileVisibility === this.visibilityType.FOG) {
                // TODO Missing FOG graphical assets
                this.layers[0].addMember({
                    frame: "Fish_Big.png",
                    x: x * this.tilerepo.TILE_SIZE,
                    y: y * this.tilerepo.TILE_SIZE,
                });
            } else {
                // Visibility BLACK
            }
        }
    }

    // TODO vyhodnit idx a dopocitat na zak. coordinates
    rerenderTile(idx: number): void {
        const { TILE_SIZE, TILE_SIZE_TALL } = this.tilerepo;
        const TILE_SIZE_TALL_CORRECTION = (TILE_SIZE_TALL - TILE_SIZE) / 2;
        const { x, y } = this.tilerepo.getTileCoordinatesByIndex(idx);
        const currentMember = this.getMemberByCoordinates({ x, y });
        console.log(currentMember);

        currentMember.forEach((member: SuperMember): void => {
            this.layers[member.layerIndex].removeMembers(member.index);
        });

        this.tilerepo
            .getTileIdsByIndex(idx)
            .map((tileId: number): TerrainType | null =>
                this.tilerepo.getFrameNameByTileId(tileId),
            )
            .forEach((name: TerrainType | null): void => {
                if (!name || name === TerrainType.NOT_SET) return;

                this.frameNameToLayerCache.forEach(
                    (atlas: Set<TerrainType>, index: number): void => {
                        if (!atlas.has(name)) return;

                        const layer = this.layers[index];
                        const memberData = {
                            frame: name,
                            x: x * TILE_SIZE,
                            y:
                                y * TILE_SIZE -
                                (this.tallFrameNamesCache.has(name)
                                    ? TILE_SIZE_TALL_CORRECTION
                                    : 0),
                        };
                        layer.addMember(memberData);
                    },
                );
            });
    }

    getMemberByCoordinates({ x, y }: { x: number; y: number }): SuperMember[] {
        const members: SuperMember[] = [];
        const { TILE_SIZE, TILE_SIZE_TALL } = this.tilerepo;
        const TILE_SIZE_TALL_CORRECTION = (TILE_SIZE_TALL - TILE_SIZE) / 2;

        const tileSize = this.tilerepo.TILE_SIZE;

        // NOTE: layer.memberCount === layer.size
        this.layers.forEach(
            (
                layer: Phaser.GameObjects.SpriteGPULayer,
                layerIndex: number,
            ): void => {
                for (let i = 0, size = layer.size; i < size; i++) {
                    const member = layer.getMember(i);
                    if (!member) continue;
                    if (isNaN(+member.x) || isNaN(+member.y)) continue;

                    const memberFrame = member.frame as TerrainType;

                    const memberX = Math.trunc(+member.x / tileSize);
                    const memberY = Math.trunc(
                        (+member.y +
                            (this.tallFrameNamesCache.has(memberFrame)
                                ? TILE_SIZE_TALL_CORRECTION
                                : 0)) /
                        tileSize,
                    );

                    if (memberX === x && memberY === y)
                        members.push({ index: i, member: member, layerIndex });
                }
            },
        );
        return members;
    }

    setupSceneCamera(): void {
        this.camera = this.cameras.main;

        const screanWidth = this.tilerepo.MAP_SIZE * this.tilerepo.TILE_SIZE;
        const screanHeight = this.tilerepo.MAP_SIZE * this.tilerepo.TILE_SIZE;

        // Set camera bounds according to the dimensions of the tilemap
        this.camera.setBounds(0, 0, screanWidth, screanHeight);

        // Initialize the scroll camera to the center of the map
        const dimensionInPixels =
            (this.tilerepo.MAP_SIZE * this.tilerepo.TILE_SIZE) / 2;
        this.camera.centerOn(dimensionInPixels, dimensionInPixels);
    }

    setCameraController(): void {
        const cameraController = this.plugins.get("rexCameraController");
        if (cameraController) {
            // @ts-expect-error - missing types
            cameraController.add(this, {
                camera: this.camera,
                minZoom: 0.01,
                maxZoom: 10,
                panScroll: false, // !!
                panScrollEnable: false, // !!
                pinchZoom: true,
                pinchZoomEnable: true,
                pinchZoomMin: 0.1,
                pinchZoomMax: 10,
            });
        }

        this.camera?.setZoom(0.2);
    }

    selectTile(clickedTile: TileEntity): void {
        const isVisible = this.tilerepo
            .getTileEntitiesByIndex(clickedTile?.id)?.[0]
            ?.api.getParamByName("visibility");

        if (isVisible) {
            // TODO ++ fallback position in px for specific building overlap
            const x =
                (clickedTile.x - 1) * this.tilerepo.TILE_SIZE +
                this.tilerepo.TILE_SIZE / 2; // TODO
            const y =
                (clickedTile.y - 1) * this.tilerepo.TILE_SIZE +
                this.tilerepo.TILE_SIZE / 2; // TODO

            if (this.lastClickedTile === null) {
                this.graphics = this.add
                    .graphics({
                        lineStyle: { width: 6, color: 0xffffff },
                        fillStyle: { color: 0x000000, alpha: 0.5 },
                    })
                    .strokeRectShape(
                        new Phaser.Geom.Rectangle(
                            x,
                            y,
                            this.tilerepo.TILE_SIZE,
                            this.tilerepo.TILE_SIZE,
                        ),
                    );
            } else {
                this.graphics!.clear();

                this.graphics!.strokeRectShape(
                    new Phaser.Geom.Rectangle(
                        x,
                        y,
                        this.tilerepo.TILE_SIZE,
                        this.tilerepo.TILE_SIZE,
                    ),
                );
            }
            this.lastClickedTile = clickedTile;
        } else {
            this.emitter.emit(EmitterEvents.PhaserRedirect);
        }
    }

    deselectTile(): void {
        this.graphics?.clear();
        this.lastClickedTile = null;
    }

    toastMessageAnimation(x: number, y: number, text: string): void {
        const textStyle = {
            fontSize: "24px",
            color: "#ffffff",
            fontWeight: "500",
            align: "center",
        };

        const bgWidth = 200;
        const bgHeight = 60;

        const background = this.add
            .graphics()
            .fillStyle(0x000000, 1)
            .fillRoundedRect(
                x * this.tilerepo.TILE_SIZE - bgWidth / 2,
                y * this.tilerepo.TILE_SIZE - bgHeight / 2,
                bgWidth,
                bgHeight,
                10,
            );

        const toastText = this.add
            .text(
                x * this.tilerepo.TILE_SIZE,
                y * this.tilerepo.TILE_SIZE,
                `${text} 💰`,
                textStyle,
            )
            .setOrigin(0.5);

        this.tweens.add({
            targets: [background, toastText],
            y: "-=100",
            alpha: 0,
            duration: 1000,
            ease: "Sine.easeInOut",
            onComplete: (): void => {
                background.destroy();
                toastText.destroy();
            },
        });
    }

    exploreTile(clickedTile: TileEntity): void {
        const x = clickedTile.x;
        const y = clickedTile.y;

        const durability = 0; // TODO WIP dynamic by tile api

        if (durability >= 1) {
            // tileVisibilityEntity?.decrementDurability(); // TODO: implement in tileRepo
            const cost = 92;
            this.toastMessageAnimation(x, y, `- ${cost} Gold`); // TODO dynamic value from config
        } else {
            const currentMember = this.getMemberByCoordinates({
                x,
                y,
            });
            if (!currentMember) return;

            // NOTE: clickedTile.id !== this.tilerepo.getTileIndexByCoordinates({ x, y: y })
            const idx = this.tilerepo.getTileIndexByCoordinates({ x, y });
            this.rerenderTile(idx);

            const clickedTileParams = this.tilerepo.getTileEntitiesByIndex(
                clickedTile?.id,
            );

            if (!clickedTileParams[0]) return;

            // Update the visibility of the clicked tile to EXPLORED
            clickedTileParams[0].api.setParamByName(
                "visibility",
                this.visibilityType.EXPLORED,
            );

            // TODO move functionality to tileRepo
            for (let dy = -this.fogRadius; dy <= this.fogRadius; dy++) {
                for (let dx = -this.fogRadius; dx <= this.fogRadius; dx++) {
                    if (Math.abs(dx) + Math.abs(dy) === 1) {
                        // NOTE: layer.size does not auto-increment after calling addMember()!!
                        // Increase the layer size for new fog part
                        this.layers[0]?.resize(this.layers[0].size + 1);

                        const neighborX = x + dx;
                        const neighborY = y + dy;

                        const neighborTile = this.tilerepo.getTileAt({
                            x: neighborX,
                            y: neighborY,
                        });

                        if (!neighborTile) continue;

                        const neighborTileParams =
                            this.tilerepo.getTileEntitiesByIndex(
                                neighborTile?.id,
                            );

                        if (!neighborTileParams[0]) continue;

                        const neighborTileVisibility =
                            neighborTileParams[0].api.getParamByName(
                                "visibility",
                            ) ?? 0;

                        if (
                            neighborTile &&
                            neighborTileVisibility === this.visibilityType.BLACK
                        ) {
                            this.layers[0]?.addMember({
                                frame: "Sea_Deep.png",
                                x: neighborTile.x * this.tilerepo.TILE_SIZE,
                                y: neighborTile.y * this.tilerepo.TILE_SIZE,
                            });

                            // Set new FOG part for next exploration
                            neighborTileParams[0].api.setParamByName(
                                "visibility",
                                this.visibilityType.FOG,
                            );
                        }
                    }
                }
            }
        }
    }

    clickTile(clickedTile: TileEntity): void {
        if (clickedTile !== null) {
            const tileVisibility = this.tilerepo
                .getTileEntitiesByIndex(clickedTile?.id)?.[0]
                ?.api.getParamByName("visibility");

            switch (tileVisibility) {
                case this.visibilityType.EXPLORED:
                    this.emitter.emit(
                        EmitterEvents.PhaserTileDetailOpen,
                        clickedTile,
                    );
                    this.selectTile(clickedTile);
                    break;
                case this.visibilityType.FOG:
                    this.deselectAndRedrect();
                    this.exploreTile(clickedTile);
                    break;
                case this.visibilityType.BLACK:
                    this.deselectAndRedrect();
                    break;
                default:
                    break;
            }
        }
    }

    deselectAndRedrect(): void {
        // this closes the modal window, reset to base url
        this.emitter.emit(EmitterEvents.PhaserRedirect);
        // but we still need to remove the last selected tile from the scene
        this.deselectTile();
    }

    addClickHandler(): void {
        // Threshold for distinguishing dragging from clicking
        const dragDistanceThreshold = 10;
        let pointerDownTime = 0;

        // Processing mouse inputs for panning
        this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            this.isDragging = false;
            this.dragStartPoint.set(pointer.x, pointer.y);
            this.cameraStartPoint.set(
                this.cameras.main.scrollX,
                this.cameras.main.scrollY,
            );
            pointerDownTime = this.time.now; // Save the time of the press
        });

        this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
            if (pointer.isDown) {
                const zoomLevel = this.cameras.main.zoom;
                const deltaX = (pointer.x - this.dragStartPoint.x) / zoomLevel;
                const deltaY = (pointer.y - this.dragStartPoint.y) / zoomLevel;

                // If the distance exceeds the threshold, we start dragging
                if (
                    Math.abs(deltaX) > dragDistanceThreshold ||
                    Math.abs(deltaY) > dragDistanceThreshold
                ) {
                    this.isDragging = true;
                    this.cameras.main.scrollX =
                        this.cameraStartPoint.x - deltaX;
                    this.cameras.main.scrollY =
                        this.cameraStartPoint.y - deltaY;
                }
            }
        });

        this.input.on("pointerup", (pointer: Phaser.Input.Pointer) => {
            const clickDuration = this.time.now - pointerDownTime;
            const deltaX = pointer.x - this.dragStartPoint.x;
            const deltaY = pointer.y - this.dragStartPoint.y;
            const dragDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (
                !this.isDragging &&
                dragDistance <= dragDistanceThreshold &&
                clickDuration < 300
            ) {
                if (!this.isDragging) {
                    const worldPoint = this.camera!.getWorldPoint(
                        pointer.x,
                        pointer.y,
                    );

                    const halfTileSize = this.tilerepo.TILE_SIZE / 2;
                    const col = Math.trunc(
                        (worldPoint.y + halfTileSize) / this.tilerepo.TILE_SIZE,
                    );
                    const row = Math.trunc(
                        (worldPoint.x + halfTileSize) / this.tilerepo.TILE_SIZE,
                    );

                    const tile = this.tilerepo.getTileAt({
                        x: row,
                        y: col,
                    });

                    // @ts-expect-error - I am lazy to fix this mess...
                    this.clickTile(tile);
                }
            }

            this.isDragging = false;
        });
    }
}

export default MainMapScene;
