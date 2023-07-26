<template>
  <Skeleton
    active
    :loading="menu.loading"
    :paragraph="{ rows: 6 }"
    :title="false"
    style="padding: 20px"
  >
    <Menu :items="menuList" mode="inline" :selectedKeys="[activeMenu]" @click="handleClick" />
  </Skeleton>
</template>

<script>
import { h, computed } from 'vue';
import * as icons from '@ant-design/icons-vue';

// 动态渲染icon
const antdIcon = function (icon) {
  return icon && h(icons[icon]);
};
const getItem = function ({ id, type, title, path, children, icon }) {
  return {
    key: path || id,
    label: title,
    icon: icon ? antdIcon(icon) : '',
    children: type === '2' ? (children || []).map((item) => getItem(item)) : undefined,
  };
};
</script>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { Menu, Skeleton } from 'ant-design-vue';
import router from '@/router/index';
import useAsyncMenuStore from '@/stores/async-routes';

const asyncMenuStore = useAsyncMenuStore();
const { updateMenu } = asyncMenuStore;
const { menu } = storeToRefs(asyncMenuStore);

const menuList = computed(() => {
  const initialMenuList = menu.value.data || [];
  return initialMenuList.map((item) => getItem(item));
});

onMounted(() => updateMenu());

const activeMenu = computed(() => router.currentRoute.value.path);

const handleClick = function ({ key }) {
  router.push(key);
};
</script>
