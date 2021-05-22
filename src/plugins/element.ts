import { App } from 'vue';
import {
  ElButton, ElMessage, ElNotification, ElMessageBox,
  ElMenu, ElMenuItem, ElMenuItemGroup, ElSubmenu,
  ElRow, ElCol, ElBreadcrumb, ElBreadcrumbItem,
} from 'element-plus';
import lang from 'element-plus/lib/locale/lang/zh-cn';
import locale from 'element-plus/lib/locale';
import 'dayjs/locale/zh-cn';

export type Size = 'default' | 'medium' | 'small' | 'mini';

export default (app: App) => {
  locale.use(lang);

  const components = [
    ElButton,
    ElMessage,
    ElNotification,
    ElMessageBox,
    ElMenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElSubmenu,
    ElRow,
    ElCol,
    ElBreadcrumb,
    ElBreadcrumbItem,
  ];

  components.forEach((component) => {
    app.component(component.name, component);
  });

  app.config.globalProperties.$ELEMENT = {
    size: 'medium',
  };
  // 统一挂载组件到 app 上
  app.config.globalProperties.$message = ElMessage;
  app.config.globalProperties.$notify = ElNotification;
  app.config.globalProperties.$confirm = ElMessageBox.confirm;
  app.config.globalProperties.$alert = ElMessageBox.alert;
  app.config.globalProperties.$prompt = ElMessageBox.prompt;
};
