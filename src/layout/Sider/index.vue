<template>
  <Sider theme="light" :collapsed="props.collapsed" :collapsedWidth="collapsedWidth" />
  <Sider
    theme="light"
    :collapsed="props.collapsed"
    :collapsedWidth="collapsedWidth"
    class="lay-sider"
  >
    <div class="logo-bar"></div>

    <Menu />
  </Sider>
</template>

<script setup>
import { Layout } from 'ant-design-vue'
import Menu from './Menu.vue'

const { Sider } = Layout
const props = defineProps({
  collapsed: {
    type: Boolean,
    required: true
  }
})

const collapsedWidth = 64 // 收起时的宽度
</script>

<style scoped>
.lay-sider {
  position: fixed !important ;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
