import Layout  from '@/views/layout/index.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { getToken } from '@/utils/cookies';
import { useUserStore } from '@/store/modules/user';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    component: Layout, // 使用 Layout 作为页面布局
    redirect: "/logs_table",
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'logs_table',
        name: 'logs_table',
        component: () => import('@/views/logs-table/index.vue'),
        meta: { requiresAuth: true },
      },

      // 可以在这里继续添加更多需要使用 Layout 的子路由
    ],
  },
  // 处理不存在的路由
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/error-page/404.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async(to, from, next) => {
  const userStore = useUserStore();
  const publicPages = ['/login']; // 公开访问的页面
  const authRequired = !publicPages.includes(to.path); // 判断当前路由是否需要认证
  const loggedIn = userStore.token; // 检查用户是否登录

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});


export default router;
