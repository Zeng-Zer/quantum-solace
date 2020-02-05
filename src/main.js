import Vue from "vue";
import router from "./plugins/vue-router";
import vuetify from "./plugins/vuetify";
import VueMathjax from "vue-mathjax";

import App from "./App";

Vue.config.productionTip = false;

Vue.use(VueMathjax);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
