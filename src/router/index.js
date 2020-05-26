import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Main from "../components/Main";
import Discuss from "../components/Discuss";
import Ask from "../components/Ask";
import recorder from "../components/recorder";
import register from "../components/register";
import signIn from "../components/signIn";
import Lite from "../components/Lite";
import community from "../components/community";
Vue.use(VueRouter);

VueRouter.prototype.goBack = function() {
  this.isBack = true;
  window.history.go(-1);
};
const routes = [
  {
    path: "/",
    name: "community",
    component: community,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/Main",
    name: "Main",
    component: Main,
  },
  {
    path: "/Discuss",
    name: "Discuss",
    component: Discuss,
  },
  {
    path: "/Ask",
    name: "Ask",
    component: Ask,
  },
  {
    path: "/recorder",
    name: "recorder",
    component: recorder,
  },
  {
    path: "/register",
    name: "register",
    component: register,
  },
  {
    path: "/signIn",
    name: "signIn",
    component: signIn,
  },
  {
    path: "/Lite",
    name: "Lite",
    component: Lite,
  },
  {
    path: "/community",
    name: "community",
    component: community,
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
