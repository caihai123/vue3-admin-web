<template>
  <Sider theme="light" :collapsed="props.collapsed" :collapsedWidth="collapsedWidth" />
  <Sider
    theme="light"
    :collapsed="props.collapsed"
    :collapsedWidth="collapsedWidth"
    class="lay-sider"
  >
    <div class="logo-bar"></div>

    <Menu :menu="menu" />
  </Sider>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Layout } from 'ant-design-vue'
import Menu from './LayMenu.vue'
import axios from '@/utils/axios'

const { Sider } = Layout
const props = defineProps({
  collapsed: {
    type: Boolean,
    required: true
  }
})

const collapsedWidth = 64 // 收起时的宽度
const menu = ref({
  list: [],
  loading: false
})
onMounted(() => {
  menu.value.loading = true
  axios
    .get('/api/get-menu-all')
    .then((value) => {
      menu.value.list = value.result || []
    })
    .finally(() => {
      menu.value.loading = false
    })
})
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
