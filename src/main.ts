import { createApp } from 'vue';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import 'normalize.css/normalize.css';

import initSvgIcon from '@/icons/index';
import App from './App.vue';
import router from './router';
import store from './store';
import installElementPlus, { Size } from './plugins/element';
import '@/styles/index.scss';

const app = createApp(App);
app.use(store)
  .use(router)
  .use(installElementPlus)
  .use(initSvgIcon)
  .mount('#app');

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof ElMessage;
    $notify: typeof ElNotification;
    $confirm: typeof ElMessageBox.confirm;
    $alert: typeof ElMessageBox.alert;
    $prompt: typeof ElMessageBox.prompt;
    $ELEMENT: {
      size: Size;
    }
  }
}
