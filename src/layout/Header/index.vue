<template>
  <Header class="lay-header" :style="{ background: token.colorBgContainer }">
    <div>
      <div class="trigger" @click="$emit('setCollapsed', !collapsed)">
        <MenuUnfoldOutlined v-if="props.collapsed" />
        <MenuFoldOutlined v-else />
      </div>
    </div>
    <div></div>
  </Header>
</template>

<script setup>
import { Layout, theme } from 'ant-design-vue'
const { Header } = Layout
const { token } = theme.useToken()

// trigger 按钮相关
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
const props = defineProps({
  collapsed: {
    type: Boolean,
    required: true
  }
})
</script>

<style scoped>
.lay-header {
  height: 48px;
  display: flex;
  justify-content: space-between;
  padding: 0;
}

.trigger {
  height: 100%;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  font-size: 18px;
  transition: color 0.3s;
  cursor: pointer;
}
.trigger:hover {
  color: #1677ff;
}
</style>
