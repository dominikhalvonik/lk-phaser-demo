# lk-phaser-demo

Demo application for project Lost Kingdom - Phaser. This application demonstrates three different approaches to implementing tilemaps in Phaser. The application includes four scenes:

## Scenes

### 1. PreloadScene
This scene is always loaded and is responsible for loading textures into the game.

### 2. TileMapNormalScene
This scene implements tilemap creation using the `Tilemap`, `TilemapLayer`, and `Tile` objects from Phaser. It is the preferred implementation option. However, it has a significant drawback:
- **High RAM usage** due to the large amount of data stored in the `Tile` object.
- We would like to explore the possibility of removing unnecessary data (e.g., physics-related data) that are not used in our game.

### 3. TileMapImageFullScene
This scene implements tilemap creation using the `Image` object from Phaser, where all tiles are loaded when the scene starts. The issues with this approach include:
- **Poor performance** when handling large tilemaps (e.g., 1024x1024).
- This implementation is included primarily to demonstrate complexity but is not a viable solution for large maps.

### 4. TileMapImageBatchScene
This scene implements tilemap creation using the `Image` object, similar to `TileMapImageFullScene`, but with a key performance improvement:
- The number of `Image` objects rendered/loaded corresponds only to the tiles visible in the camera's viewport.
- When a tile (image) is outside the viewport, it is deleted.

This solution provides better performance but still has issues:
- Rendering performance decreases when the zoom level is high.

## Non-Functional Requirements

The mandatory non-functional requirements for our game are:

A) The map size must be **1024x1024 tiles**.

B) Zooming must be implemented, including a maximum zoom-out level.

C) The application must run on mobile devices (Android/iOS).

---

This project is a demonstration of potential solutions for implementing large tilemaps in Phaser while considering performance and usability constraints. Feedback and suggestions are welcome.
