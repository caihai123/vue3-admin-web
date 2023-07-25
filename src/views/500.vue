<template>
  <div class="main">
    <Result status="500" title="500" sub-title="对不起，服务器错误。">
      <template #extra>
        <Button type="primary" @click="router.push('/')">回到首页</Button>
      </template>
    </Result>
  </div>
</template>

<script setup>
import { Result, Button } from 'ant-design-vue'
import router from '@/router/index'
</script>

<style scoped>
.main {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
