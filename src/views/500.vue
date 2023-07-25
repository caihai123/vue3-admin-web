<template>
  <Result status="500" title="500" sub-title="Sorry, you are not authorized to access this page.">
    <template #extra>
      <Button type="primary">Back Home</Button>
    </template>
  </Result>
</template>

<script setup>
import { Result, Button } from 'ant-design-vue'
</script>
