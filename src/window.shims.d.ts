import type Phaser from "phaser";
import { type Env } from "./config/env";

declare global {
	interface Window {
		// from Vite
		__APP_ENV__: Env;
		__APP_VERSION__: string;
		__APP_BUILD_TIMESTAMP__: number;

		// from Flutter
		/* eslint-disable @typescript-eslint/no-explicit-any */
		flutter_inappwebview: any;
		handleJs: any;
		handleJs2: any;
		/* eslint-enable @typescript-eslint/no-explicit-any */

		version: string;
		__PHASER_GAME__: Phaser.Game | null;
	}
}
