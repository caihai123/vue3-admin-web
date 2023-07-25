<template>
  <Result status="404" title="404" sub-title="Sorry, you are not authorized to access this page.">
    <template #extra>
      <Button type="primary">Back Home</Button>
    </template>
  </Result>
</template>

<script setup>
import { Result, Button } from 'ant-design-vue'
</script>
