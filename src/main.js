import Vue from "vue";
import router from "./plugins/vue-router";
import vuetify from "./plugins/vuetify";

import App from "./App";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
