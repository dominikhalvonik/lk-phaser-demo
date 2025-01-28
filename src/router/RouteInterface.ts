import type { RouteRecordRaw } from "vue-router";

export type RouteRecordCustom = Pick<RouteRecordRaw, "path"> &
	Partial<
		Pick<
			RouteRecordRaw,
			| "name"
			| "component"
			| "components"
			| "redirect"
			| "props"
			| "beforeEnter"
			| "meta"
		> & {
			children?: RouteRecordCustom[];
		}
	>;
