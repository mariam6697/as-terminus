import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import LandingView from "../views/LandingView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "landing",
    component: LandingView,
  },
  {
    path: "/acerca-de",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/proyectos/:projectId",
    name: "projects",
    component: () => import("../views/ProjectsDetailsView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
