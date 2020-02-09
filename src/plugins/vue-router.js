import Vue from "vue";
import VueRouter from "vue-router";

import Game from "@/pages/Game";
import Onboarding from "@/pages/Onboarding";
import End from "@/pages/End";

Vue.use(VueRouter);

const routes = [
  { path: "/game/:level", component: Game },
  { path: "/", component: Onboarding },
  { path: "/end", component: End }
];

export default new VueRouter({
  mode: "history",
  routes
});
