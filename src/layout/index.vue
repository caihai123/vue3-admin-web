<template>
  <Layout style="height: 100vh">
    <Sider :collapsed="collapsed" />
    <Layout>
      <Header :collapsed="collapsed" @setCollapsed="(val) => (collapsed = val)" />
      <Layout.Content>
        <RouterView />
      </Layout.Content>
    </Layout>
  </Layout>
</template>

<script setup>
import { ref } from 'vue'
import { Layout } from 'ant-design-vue'
import Header from './Header/index.vue'
import Sider from './Sider/index.vue'

const collapsed = ref(false)
</script>

<style scoped></style>
