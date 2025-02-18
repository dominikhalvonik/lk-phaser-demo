import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordCustom } from "./RouteInterface";

import PhaserGame from "@/components/PhaserGame.vue";
import TileDetailComponent from "@/components/TileDetailComponent.vue";

const routes: RouteRecordCustom[] = [
	{
		path: "/",
		name: "LayoutView",
		component: PhaserGame,
		children: [
			{
				path: "/tile/:x(\\d+)/:y(\\d+)",
				name: "Tile",
				component: TileDetailComponent,
			},
		],
	},
	{
		// catches all unmatched paths
		path: "/:catchAll(.*)",
		redirect: "/",
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes: routes as RouteRecordRaw[],
});

export default router;
