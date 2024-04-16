import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      redirect: "/home/list",
      component: () => import("../views/HomeView.vue"),
      children: [
        {
          path: "list",
          name: "home-list",
          component: () => import("../views/home/VocabularyListView.vue")
        }
      ]
    },
    {
      path: "/setting",
      name: "setting",
      redirect: "/setting/list",
      component: () => import("../views/SettingView.vue"),
      children: [
        {
          path: "list",
          alias: "list",
          name: "setting-list",
          component: () => import("../views/setting/VocabularyListView.vue")
        },
        {
          path: "edit/:name",
          name: "setting-edit",
          component: () => import("../views/setting/VocabularyEditView.vue")
        }
      ]
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../views/TestView.vue"),
      children: [
        {
          path: ":name",
          name: "test-choose",
          component: () => import("../views/test/TestContentChooseView.vue")
        },
        {
          path: "testing",
          name: "test-testing",
          component: () => import("../views/test/TestingView.vue")
        },
        {
          path: "result",
          name: "test-result",
          component: () => import("../views/test/TestResultView.vue")
        }
      ]
    }
  ]
});

export default router;
