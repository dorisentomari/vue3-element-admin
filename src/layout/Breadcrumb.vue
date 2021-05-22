<template>
  <el-breadcrumb class="app-breadcrumb breadcrumb-container" separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in levelList"
      :key="item.path"
    >
      <span
        v-if="index === levelList.length - 1"
        class="no-redirect"
      >{{ item.meta.title }}</span>
      <a v-else @click.prevent="handleClick(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import {
  defineComponent, ref, watch, onBeforeMount,
} from 'vue';
import {
  useRoute, useRouter, RouteLocationMatched, RouteLocationRaw,
} from 'vue-router';
import { compile } from 'path-to-regexp';

type PartialRouteLocationMatches = Partial<RouteLocationMatched>;

export default defineComponent({
  name: 'Breadcrumb',

  setup() {
    const route = useRoute();
    const router = useRouter();

    const levelList = ref<Array<PartialRouteLocationMatches>>([]);

    // eslint-disable-next-line no-shadow
    const isDashboard = (route?: PartialRouteLocationMatches) => {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return (name as string).trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase();
    };

    const getBreadcrumb = () => {
      let matched = route.matched.filter((item) => item.meta && item.meta.title) as
        PartialRouteLocationMatches[];

      const first = matched[0];

      if (!isDashboard(first)) {
        matched = ([{
          path: '/dashboard',
          meta: {
            title: 'Dashboard',
          },
        }] as PartialRouteLocationMatches[]).concat(matched);
      }

      levelList.value = matched.filter((item) => item.meta && item.meta.title
        && item.meta.breadcrumb !== false);
    };

    onBeforeMount(() => {
      getBreadcrumb();
    });

    watch(() => route.path, () => {
      getBreadcrumb();
    });

    const pathCompile = (path: string) => {
      return compile(path)(route.params);
    };

    const handleClick = (r: RouteLocationMatched) => {
      const { path, redirect } = r;
      if (redirect) {
        router.push(redirect as RouteLocationRaw);
        return;
      }
      router.push(pathCompile(path));
    };

    return {
      levelList,
      handleClick,
    };
  },

});
</script>

<style lang="scss">
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  line-height: 50px;
  font-size: 14px;
  margin-left: 8px;
}

.no-redirect {
  color: #97a8be;
  cursor: text;
}

</style>

<style lang="scss" scoped>
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}

.breadcrumb-move {
  transition: all 0.5s;
}
</style>
