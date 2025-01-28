import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import {
	defineConfig,
	loadEnv,
	type ConfigEnv,
	type UserConfigExport,
} from "vite";
import { version } from "./package.json";

export default ({ mode }: ConfigEnv): UserConfigExport => {
	console.log(`Running app in mode: ${mode}`);

	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		build: {
			chunkSizeWarningLimit: 1024,
			assetsInlineLimit: 0,
			rollupOptions: {
				cache: false,
				output: {
					manualChunks: {
						phaser: ["phaser"],
						vue: ["vue", "vue-router", "pinia", "@vueuse/core"],
					},
				},
			},
			sourcemap: true,
			minify: "esbuild",
		},
		esbuild: {
			// config
		},
		define: {
			__VUE_OPTIONS_API__: false,
			__VUE_PROD_DEVTOOLS__: ["dev", "qa"].includes(
				process.env.VITE_ENV || "",
			),
			__APP_ENV__: JSON.stringify(mode),
			__APP_VERSION__: JSON.stringify(version),
			__APP_BUILD_TIMESTAMP__: JSON.stringify(Date.now()),
		},
		plugins: [vue()],
		resolve: {
			alias: {
				"@": resolve(__dirname, "src"), // Používame len resolve
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: "modern",
					additionalData: `
						@use "sass:math";
						@use "@/assets/styles/variables.scss" as *;
						@use "@/assets/styles/mixins.scss" as *;
					`,
				},
			},
		},
	});
};
