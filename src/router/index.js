import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
      meta: { title: "首页" },
    },
    {
      path: "/home",
      component: () => import("../pages/Home.vue"),
      name: "home",
      meta: { title: "首页", name: "home", isTab: true },
    },
    {
      path: "/goodsDetail",
      component: () => import("../pages/GoodsDetail.vue"),
      name: "GoodsDetail",
      meta: { title: "商品详情", isTab: true, isShowNav: true },
    },
    {
      path: "/message",
      component: () => import("../pages/Message.vue"),
      name: "message",
      meta: { title: "消息", isTab: true, isShowNav: true },
    },
    {
      path: "/user",
      component: () => import("../pages/User.vue"),
      name: "user",
      meta: { title: "我的", isTab: true },
    },
  ],
});
router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title + " - 微商城";
  }
  next();
});
export default router;
