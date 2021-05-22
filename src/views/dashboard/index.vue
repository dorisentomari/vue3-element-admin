<template>
  <div>
    <h1 @click="sayHi">dashboard page</h1>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue';

export default {
  name: 'dashboard',

  setup() {
    const instance = getCurrentInstance();
    const sayHi = () => {
      instance.proxy.$message('你好');
      console.log('hi svg');
    };
    return {
      sayHi,
    };
  },
};
</script>

<style lang="scss" scoped>

.custom-class { // 自定义样式404
  font-size: 200px;
  color: green;
}
</style>
