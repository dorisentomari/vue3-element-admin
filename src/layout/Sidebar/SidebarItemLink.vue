<template>
  <component :is="type" v-bind="linkProps">
    <slot></slot>
  </component>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { isExternal } from '@/utils/validate';

export default defineComponent({
  name: 'SidebarItemLink',

  props: {
    to: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const isExt = computed(() => isExternal(props.to));

    const type = computed(() => {
      if (isExt.value) {
        return 'a';
      }
      return 'router-link';
    });

    const linkProps = computed(() => {
      if (isExt.value) {
        return {
          href: props.to,
          target: '_blank',
          rel: 'noopener',
        };
      }
      return {
        to: props.to,
      };
    });

    return {
      type,
      linkProps,
    };
  },
});
</script>

<style scoped>

</style>
