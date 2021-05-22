<template>
  <div
    class="svg-icon svg-external-icon"
    v-if="isExt"
    :style="styleExternalIcon"
    v-bind="$attrs"
  ></div>
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import { computed } from 'vue';

import { isExternal } from '@/utils/validate';

export default {
  name: 'SvgIcon',
  // 组件上的 $attrs 不自动添加到组件根元素上
  inheritAttrs: false,

  props: {
    iconClass: {
      type: String,
      require: true,
    },
    className: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    // 是否是带协议的图片链接
    const isExt = computed(() => isExternal(props.iconClass || ''));
    // 拼接成 symbolId 在 loader 配置中指定了 symbolId 格式 icon-图标名称
    const iconName = computed(() => `#icon-${props.iconClass}`);
    // 添加类名 props.className 外部传入自定义类名
    const svgClass = computed(() => (props.className ? `svg-icon ${props.className}` : 'icon-svg'));
    // 如果 iconClass 是带协议的图标链接，则通过 style css 属性方式渲染
    const styleExternalIcon = computed(() => ({
      mask: `url(${props.iconClass}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`,
    }));

    return {
      isExt,
      iconName,
      svgClass,
      styleExternalIcon,
    };
  },

};
</script>

<style lang="scss" scoped>

.icon-svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}

</style>
