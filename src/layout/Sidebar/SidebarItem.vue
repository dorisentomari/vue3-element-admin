<template>
  <div
    class="sidebar-item-container"
    v-if="!item.meta || !item.meta.hidden"
    >
    <template v-if="isRenderSingleRoute && theOnlyOneChildRoute">
      <sidebar-item-link
        v-if="theOnlyOneChildRoute.meta"
        :to="resolvePath(theOnlyOneChildRoute.path)"
      >
        <el-menu-item
          :index="resolvePath(theOnlyOneChildRoute.path)"
        >
          <i v-if="icon && icon.includes('el-icon')" :class="icon"></i>
          <svg-icon
            v-else-if="icon"
            class="menu-icon"
            :icon-class="icon"
          ></svg-icon>
          <template #title>
            <span>{{ theOnlyOneChildRoute.meta.title }}</span>
          </template>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <el-submenu
      v-else
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template #title>
        <i
          v-if="item.meta && item.meta.icon.includes('el-icon')"
          :class="icon"
        ></i>
        <svg-icon
          v-else-if="item.meta && item.meta.icon"
          class="menu-icon"
          :icon-class="item.meta.icon"
        ></svg-icon>
        <span v-if="item.meta" class="submenu-title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      ></sidebar-item>
    </el-submenu>
  </div>
</template>

<script lang="ts">

import {
  computed, defineComponent, PropType, toRefs,
} from 'vue';
import path from 'path';
import { MenuItemRouter } from '@/router/types';
import SidebarItemLink from './SidebarItemLink.vue';

export default defineComponent({
  name: 'SidebarItem',

  components: {
    SidebarItemLink,
  },

  props: {
    item: {
      type: Object as PropType<MenuItemRouter>,
      required: true,
    },
    basePath: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { item } = toRefs(props);

    const showingChildNumber = computed(() => {
      const children = (props.item.children || []).filter((child) => {
        if (child.meta && child.meta.hidden) {
          return false;
        }
        return true;
      });
      return children.length;
    });

    const theOnlyOneChildRoute = computed(() => {
      if (showingChildNumber.value > 1) {
        return null;
      }
      if (item.value.children) {
        for (let i = 0; i < item.value.children.length; i++) {
          const child = item.value.children[i];
          if (!child.meta || !child.meta.hidden) {
            return child;
          }
        }
      }
      return {
        ...props.item,
        path: '',
      };
    });

    const icon = computed(() => {
      // eslint-disable-next-line max-len
      return theOnlyOneChildRoute.value?.meta?.icon || (props.item.meta && props.item.meta.icon) as string;
    });

    const resolvePath = (childPath: string) => path.resolve(props.basePath, childPath);

    const alwaysShowRootMenu = computed(() => (props.item.meta && props.item.meta.alwaysShow));

    const noShowingChildren = computed(() => showingChildNumber.value === 0);

    const isRenderSingleRoute = computed(() => !alwaysShowRootMenu.value
      && (!theOnlyOneChildRoute.value?.children || noShowingChildren.value));

    return {
      theOnlyOneChildRoute,
      icon,
      resolvePath,
      isRenderSingleRoute,
    };
  },

});
</script>

<style lang="scss" scoped>
.sidebar-item-container {
  .menu-icon {
    margin-right: 16px;
    margin-left: 5px;
    vertical-align: middle;
  }
}
</style>
