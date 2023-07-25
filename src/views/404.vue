<template>
  <div class="main">
    <Result status="404" title="404" sub-title="Sorry, you are not authorized to access this page.">
      <template #extra>
        <Button type="primary">Back Home</Button>
      </template>
    </Result>
  </div>
</template>

<script setup>
import { Result, Button } from 'ant-design-vue'
</script>

<style scoped>
.main {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
