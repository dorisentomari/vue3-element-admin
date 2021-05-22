import { RouteMeta, RouteRecordRaw } from 'vue-router';

type ItemRouterMeta = RouteMeta & {
  icon: string;
  title: string;
}

export type MenuItemRouter = RouteRecordRaw & {
  meta: ItemRouterMeta;
}
