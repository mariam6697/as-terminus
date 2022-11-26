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
  {
    path: "/categoria/:catLabel",
    name: "categories",
    component: () => import("../views/CategoryView.vue"),
  },
  {
    path: "*",
    name: "not found",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            behavior: "smooth",
            selector: to.hash,
            offset: { x: 0, y: 100 },
          });
        }, 1500);
      });
    }
  },
});

export default router;
