<template>
  <Layout style="min-height: 100vh">
    <Sider :collapsed="collapsed" />
    <Layout>
      <Header :collapsed="collapsed" @setCollapsed="(val) => (collapsed = val)" />
      <Layout.Content>
        <RouterView v-if="!menu.loading" />
        <div v-else class="page-loading"><Spin tip="Loading"></Spin></div>
      </Layout.Content>
    </Layout>
  </Layout>
</template>

<script setup>
import { ref } from 'vue'
import { Layout, Spin } from 'ant-design-vue'
import Header from './Header/index.vue'
import Sider from './Sider/index.vue'
import useAsyncMenuStore from '@/stores/async-routes'

const { menu } = useAsyncMenuStore()

const collapsed = ref(false)
</script>

<style scoped>
.page-loading {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
