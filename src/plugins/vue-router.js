import Vue from "vue";
import VueRouter from "vue-router";

import Game from "@/pages/Game";
import Onboarding from "@/pages/Onboarding";
import Menu from "@/pages/Menu";

Vue.use(VueRouter);

const routes = [
  { path: "/game/:level", component: Game },
  { path: "/onboarding", component: Onboarding },
  { path: "/menu", component: Menu }
];

export default new VueRouter({
  mode: "history",
  routes
});
