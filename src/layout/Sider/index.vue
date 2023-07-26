<template>
  <Sider theme="light" :collapsed="props.collapsed" :collapsedWidth="collapsedWidth" />
  <Sider
    theme="light"
    :collapsed="props.collapsed"
    :collapsedWidth="collapsedWidth"
    class="lay-sider"
  >
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/logo.svg" alt="logo" />
        <h1 v-show="!collapsed">Vue3 Or Antd</h1>
      </router-link>
    </div>
    <Menu />
  </Sider>
</template>

<script setup>
import { Layout } from 'ant-design-vue';
import Menu from './Menu.vue';

const { Sider } = Layout;
const props = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const collapsedWidth = 64; // 收起时的宽度
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

.logo {
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.logo > a {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
}
.logo img {
  display: inline-block;
  width: 32px;
  height: 32px;
  vertical-align: middle;
}
.logo h1 {
  height: 32px;
  margin: 0 0 0 12px;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  vertical-align: middle;
  animation: titleHide 0.3s;
}

@keyframes titleHide {
  0% {
    display: none;
    opacity: 0;
  }

  80% {
    display: none;
    opacity: 0;
  }

  to {
    display: unset;
    opacity: 1;
  }
}
</style>
