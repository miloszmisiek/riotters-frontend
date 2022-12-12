import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CryptoData from "../components/CryptoData.vue";
import EmptyComponent from "../components/EmptyComponent.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      props: true,
      children: [
        {
          path: "/summary",
          name: "summary",
          component: CryptoData,
          props: true,
        },
        {
          path: "table",
          name: "table",
          component: EmptyComponent,
          props: true,
        },
        {
          path: "charts",
          name: "charts",
          component: EmptyComponent,
          props: true,
        },
        {
          path: "reporting",
          name: "reporting",
          component: EmptyComponent,
          props: true,
        },
        {
          path: "analysis",
          name: "analysis",
          component: EmptyComponent,
          props: true,
        },
      ],
    },
  ],
});

export default router;
