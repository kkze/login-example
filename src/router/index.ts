import Layout  from '@/views/layout/index.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { getToken } from '@/utils/cookies';

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

router.beforeEach((to, from, next) => {
  const token = getToken(); // 假设 getToken() 用于获取当前用户的 Token

  if (to.meta.requiresAuth && !token) {
    // 如果路由需要认证且用户未登录（即没有Token），则重定向到登录页
    next({ name: 'login' });
  } else {
    next(); // 用户已登录，或者访问不需要认证的路由，正常导航到目标页面
  }
});

export default router;
