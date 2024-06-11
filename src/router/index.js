import { createRouter, createWebHistory } from 'vue-router';
import useUserStore from '@/stores/user';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import ManageView from '@/views/ManageView.vue';

const routes = [
  {
    name: 'HomeView',
    path: '/',
    component: HomeView,
  },
  {
    name: 'AboutView',
    path: '/about',
    component: AboutView,
  },
  {
    name: 'ManageView',
    // alias: '/manage',
    path: '/manage-music',
    component: ManageView,
    beforeEnter: (to, from, next) => {
      console.log('Manage Route Guard');

      next();
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/manage',
    redirect: { name: 'ManageView' },
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'HomeView' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  linkExactActiveClass: 'text-yellow-500',
});

router.beforeEach((to, from, next) => {
  // console.log(to.meta);
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  const store = useUserStore();
  if (store.userLoggedIn) {
    next();
    return;
  } else {
    next({ name: 'HomeView' });
  }
});

export default router;
