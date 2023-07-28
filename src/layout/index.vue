<template>
  <Layout style="min-height: 100vh">
    <Sider :collapsed="collapsed" />
    <Layout>
      <Header :collapsed="collapsed" @setCollapsed="setCollapsed" />
      <Layout.Content>
        <RouterView v-if="!menu.loading" />
        <div v-else class="page-loading"><Spin tip="Loading"></Spin></div>
      </Layout.Content>
    </Layout>
  </Layout>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { Layout, Spin } from 'ant-design-vue';
import Header from './Header/index.vue';
import Sider from './Sider/index.vue';
import useAsyncMenuStore from '@/stores/async-routes';
import { useBoolean } from '@/hooks/index';

const { menu } = storeToRefs(useAsyncMenuStore());

const [collapsed, { set: setCollapsed }] = useBoolean(false);
</script>

<style scoped>
.page-loading {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
