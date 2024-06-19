import { createRouter, createWebHistory } from 'vue-router';
import useUserStore from '@/stores/user';

// chunks for routes
const HomeView = () => import('@/views/HomeView.vue');
const AboutView = () => import('@/views/AboutView.vue');
const ManageView = () => import('@/views/ManageView.vue');
const SongView = () => import('@/views/SongView.vue');

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
  {
    name: 'song',
    path: '/song/:id',
    component: SongView,
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
