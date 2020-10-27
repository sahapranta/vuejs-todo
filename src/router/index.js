import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const router = new VueRouter();

router.beforeEach((to, from, next) => {
  store.dispatch("setVisibility", to.path.substr(1));
  next();
});

export default router;
