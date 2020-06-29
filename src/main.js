import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

// Filtre utilisé dans ListItem et dans Home
Vue.filter("chf", value => {
  return `${value.toFixed(2)} CHF`;
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
