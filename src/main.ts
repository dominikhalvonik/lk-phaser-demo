"use strict";

import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/styles/global.scss";
import "./assets/styles/vue-transitions.scss";

window.version = window.__APP_VERSION__;

const el = document.getElementById("app");
if (!el) throw new Error("Element with id 'app' not found");

el.setAttribute("data-build-version", window.__APP_VERSION__);
el.setAttribute(
	"data-build-timestamp",
	window.__APP_BUILD_TIMESTAMP__?.toString(),
);

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router);

app.mount(el);
