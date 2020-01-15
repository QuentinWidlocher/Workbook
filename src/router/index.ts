import Vue from "vue";
import VueRouter, { Route } from "vue-router";
import Home from "@/views/Home/Home.vue";
import Settings from '@/views/Settings/Settings.vue';
import { savingSpinner } from '@/services/savingSpinner';
import { loadingSpinner } from '@/services/loadingSpinner';

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/settings", name: "settings", component: Settings },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to: Route, from: Route, next: any) => {
  savingSpinner.stopSpinning();
  loadingSpinner.stopSpinning();
  next();
})

export default router;
