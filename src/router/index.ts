import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Layout from '@/layout/index.vue';

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dsahboard" */ '@/views/dashboard/index.vue'),
        meta: {
          title: 'Dashboard',
        },
      },
    ],
  },
];

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/documentation',
    component: Layout, // 布局组件作为一级路由
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        name: 'Documentation',
        component: () => import(/* webpackChunkName: "documentation" */ '@/views/documentation/index.vue'),
        meta: {
          title: 'Documentation',
          icon: 'documentation',
        },
      },
    ],
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        name: 'Guide',
        component: () => import(/* webpackChunkName: "guide" */ '@/views/guide/index.vue'),
        meta: {
          title: 'Guide',
          icon: 'guide',
        },
      },
    ],
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    meta: {
      title: 'System',
      icon: 'lock',
    },
    children: [
      {
        path: 'menu',
        component: () => import(/* webpackChunkName: "menu" */ '@/views/system/menu/index.vue'),
        meta: {
          title: 'Menu Management',
          icon: 'list',
        },
      },
      {
        path: 'role',
        component: () => import(/* webpackChunkName: "role" */ '@/views/system/role/index.vue'),
        meta: {
          title: 'Role Management',
          icon: 'list',
        },
      },
      {
        path: 'user',
        component: () => import(/* webpackChunkName: "user" */ '@/views/system/user/index.vue'),
        meta: {
          title: 'User Management',
          icon: 'list',
        },
      },
    ],
  },
];

export const routes = [
  ...constantRoutes,
  ...asyncRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
