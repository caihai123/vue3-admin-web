<!-- eslint-disable vue/no-mutating-props -->
<template>
  <Form.Item
    :label="props.item.title"
    :name="props.item.dataIndex"
    v-bind="props.item.formItemProps"
  >
    <AInput
      v-model:value="props.formState[item.dataIndex]"
      :placeholder="`请输入${item.title}`"
      v-bind="props.item.fieldProps"
    />
  </Form.Item>
</template>

<script setup>
import { Input as AInput, Form } from 'ant-design-vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  formState: {
    type: Object,
    required: true,
  },
});
</script>
