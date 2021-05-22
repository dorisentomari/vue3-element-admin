import { App } from 'vue';

import SvgIcon from '@/components/SvgIcon/index.vue';

const req = require.context('./svg', false, /\.svg$/);

function requireAll (requireContext: ReturnType<typeof require.context>) {
  return requireContext.keys().map(requireContext);
}

requireAll(req);

export default (app: App) => {
  app.component('svg-icon', SvgIcon);
};
