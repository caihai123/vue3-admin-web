<template>
  <div class="main">
    <Result status="404" title="404" sub-title="对不起，您访问的页面不存在。">
      <template #extra>
        <Button type="primary" @click="router.push('/')">回到首页</Button>
      </template>
    </Result>
  </div>
</template>

<script setup>
import { Result, Button } from 'ant-design-vue';
import router from '@/router/index';
</script>

<style scoped>
.main {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
