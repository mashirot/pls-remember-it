import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue")
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
    }
  ]
});

export default router;
