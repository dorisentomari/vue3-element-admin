<template>
  <div>
    <h6 @click="isCollapse = !isCollapse">展开关闭</h6>

    <el-menu
      class="sidebar-container-menu"
      mode="vertical"
      :default-active="activeMenu"
      :background-color="scssVariables.menuBg"
      :text-color="scssVariables.menuText"
      :active-text-color="scssVariables.menuActiveText"
      :collapse="isCollapse"
      :collapse-transition="true"
    >
      <sidebar-item/>
    </el-menu>

  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import variables from '@/styles/variables.scss';
import { routes } from '@/router';
import SidebarItem from './SidebarItem.vue';

export default defineComponent({
  name: 'Sidebar',

  components: {
    SidebarItem,
  },

  setup() {
    const route = useRoute();

    const activeMenu = computed(() => route.path);

    const scssVariables = computed(() => variables);

    // const isCollapse = computed(() => !store.getters.sidebar.opened);
    const isCollapse = ref(true);

    const menuRoutes = computed(() => routes);

    return {
      scssVariables,
      isCollapse,
      activeMenu,
      menuRoutes,
    };
  },

});
</script>

<style lang="scss" scoped>

</style>
