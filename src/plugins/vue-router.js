import Vue from "vue";
import VueRouter from "vue-router";

import Game from "@/pages/Game";
import Onboarding from "@/pages/Onboarding";

Vue.use(VueRouter);

const routes = [
  { path: "/game/:level", component: Game },
  { path: "/", component: Onboarding }
];

export default new VueRouter({
  mode: "history",
  routes
});
