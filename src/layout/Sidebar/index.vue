<template>
  <div>
    <el-menu
      class="sidebar-container-menu"
      mode="vertical"
      :default-active="activeMenu"
      :background-color="scssVariables.menuBg"
      :text-color="scssVariables.menuText"
      :active-text-color="scssVariables.menuActiveText"
      :collapse="sidebar.opened"
      :collapse-transition="true"
    >
      <sidebar-item
        v-for="route in menuRoutes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>

  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import variables from '@/styles/variables.scss';
import { routes } from '@/router';
import { useStore } from '@/store';
import SidebarItem from './SidebarItem.vue';

export default defineComponent({
  name: 'Sidebar',

  components: {
    SidebarItem,
  },

  setup() {
    const route = useRoute();

    const store = useStore();

    const sidebar = computed(() => store.getters.sidebar);

    // const isCollapse = computed(() => !store.getters.sidebar.opened);

    const activeMenu = computed(() => route.path);

    const scssVariables = computed(() => variables);

    const menuRoutes = computed(() => routes);

    return {
      scssVariables,
      sidebar,
      activeMenu,
      menuRoutes,
    };
  },

});
</script>

<style lang="scss" scoped>

</style>
