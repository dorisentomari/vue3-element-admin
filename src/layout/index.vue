<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <Sidebar/>
    </div>
    <div class="main-container">
      <div class="header">
        <Navbar/>
        <div class="tags-view">tagsview</div>
      </div>
      <app-main/>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/layout/Sidebar/index.vue';
import AppMain from '@/layout/AppMain.vue';
import Navbar from '@/layout/Navbar.vue';

export default {
  name: 'layout',

  components: {
    Sidebar,
    AppMain,
    Navbar,
  },

};
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  width: 100%;
  height: 100%;

  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;

    .header {

      .navbar {
        height: 50px;
      }

      .tags-view {
        height: 34px;
      }
    }

    .app-main {
      min-height: calc(100vh - 84px);
    }
  }

}
</style>
