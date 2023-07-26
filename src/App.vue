<template>
  <ConfigProvider
    :theme="{
      token: {
        borderRadius: 2,
        colorBgContainer: isLight ? '#ffffff' : '#242525',
        colorBgLayout: isLight ? '#f0f2f5' : '#2A2C2C',
        colorTextBase: isLight ? '#1E293B' : '#E2E8F0',
        colorBorder: isLight ? '#e5e7eb' : '#454847',
      },
      algorithm: isLight ? theme.defaultAlgorithm : theme.darkAlgorithm,
    }"
  >
    <RouterView />
  </ConfigProvider>
</template>

<script setup>
import { computed } from 'vue';
import { ConfigProvider, theme } from 'ant-design-vue';
import useSystemStore from '@/stores/system';

const systemStore = useSystemStore();
const isLight = computed(() => systemStore.theme !== 'dark');
</script>

<style scoped></style>
