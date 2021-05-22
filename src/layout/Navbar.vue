<template>
  <div class="navbar">
    <Hamburger :is-active="sidebar.opened" @toggleClick="toggleSidebar" />
    <Breadcrumb/>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from '@/store';

import Breadcrumb from '@/layout/Breadcrumb.vue';
import Hamburger from '@/layout/Hamburger.vue';

export default {
  name: 'Navbar',

  components: {
    Breadcrumb,
    Hamburger,
  },

  setup() {
    const store = useStore();

    const sidebar = computed(() => store.getters.sidebar);

    const toggleSidebar = () => {
      store.dispatch('app/toggleSidebar');
    };

    return {
      toggleSidebar,
      sidebar,
    };
  },

};
</script>

<style scoped>

</style>
