import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import single_card_tag from "./components/card-image/card-image.vue";
import list_card_imgs_tag from "./components/list-card-image/list-card-image.vue";

Vue.config.productionTip = false;
Vue.component("single-card", single_card_tag);
Vue.component("list-card-image", list_card_imgs_tag);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
