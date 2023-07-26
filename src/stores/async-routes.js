import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from '@/utils/axios';
import router, { asyncRoutes } from '@/router/index';
import Err403 from '@/views/403.vue';
import Err404 from '@/views/404.vue';

// 将菜单转为一维数组
const deep = function (menu = []) {
  const list = [];

  menu.forEach((item) => {
    if (item.type === '1') {
      list.push(item);
    }
    list.push(...deep(item.children));
  });

  return list;
};

const useAsyncMenuStore = defineStore('async-routers', () => {
  const menu = ref({
    data: [],
    loading: false,
  });

  const flattenMenu = computed(() => deep(menu.value.data));

  // 更新菜单
  const updateMenu = function () {
    menu.value.loading = true;
    return axios
      .get('/api/get-menu-all')
      .then((value) => {
        menu.value.data = value.result || [];
        updateRoutes();
      })
      .finally(() => {
        menu.value.loading = false;
      });
  };

  // 更新layout下的路由
  const updateRoutes = function () {
    asyncRoutes.forEach((item) => {
      const found = flattenMenu.value.find((i) => i.path === item.path);
      const component = found && found.permission !== false ? item.component : Err403;
      router.addRoute('layout', {
        path: item.path,
        name: item.name,
        component: component,
        meta: { title: found?.title || item?.meta?.title },
      });
    });
    router.removeRoute('NotFound');
    router.addRoute('layout', {
      path: '/:pathMatch(.*)*',
      component: Err404,
    });
    router.replace(router.currentRoute.value.fullPath);
  };

  return { menu, updateMenu };
});

export default useAsyncMenuStore;
