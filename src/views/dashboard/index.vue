<template>
  <div>
    <h1 @click="sayHi">dashboard page</h1>
    <input type="text">
  </div>
</template>

<script>
export default {
  name: 'dashboard',

  setup() {
    const sayHi = () => {
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
