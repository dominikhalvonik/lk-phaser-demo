import Phaser from "phaser";
import ktxAtlas from "@/assets/ondro-ktx.json?url";
import pngAtlas from "@/assets/ondro-png.json?url";

class PreloadScene extends Phaser.Scene {

    constructor() {
        super({
            key: "PreloadScene",
        });
    }

    preload(): void {
        if (!this.textures.exists("ondro-256-atlas")) {
            const atlasData = {
                name: "ondro-256-atlas",
                data: {
                    astc: {
                        type: "KTX",
                        multiAtlasURL: ktxAtlas,
                    },
                    img: {
                        multiAtlasURL: pngAtlas,
                    },
                },
            };

            this.load.texture(atlasData.name, {
                ASTC: {
                    type: atlasData.data.astc.type,
                    multiAtlasURL: atlasData.data.astc.multiAtlasURL,
                },
                IMG: {
                    multiAtlasURL: atlasData.data.img.multiAtlasURL,
                },
            });
        }
    }

    create(): void {
        const params = new URLSearchParams(window.location.search);
        const scene = params.get("scene");
        if(scene) {
            this.scene.start(scene);
        } else {
            this.scene.start("TileMapNormalScene");
        }

    }
}

export default PreloadScene;
