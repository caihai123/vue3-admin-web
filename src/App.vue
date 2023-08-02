<template>
  <ConfigProvider
    :locale="zhCN"
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
import { storeToRefs } from 'pinia';
import { ConfigProvider, theme } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import useSystemStore from '@/stores/system';

const { isLight } = storeToRefs(useSystemStore());
</script>

<style scoped></style>
