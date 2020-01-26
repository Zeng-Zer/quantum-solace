import Vue from "vue";
import VueRouter from "vue-router";

import Game from "@/pages/Game";

Vue.use(VueRouter);

const routes = [{ path: "/game", component: Game }];

export default new VueRouter({
  mode: "history",
  routes
});
