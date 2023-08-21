<!-- eslint-disable vue/no-mutating-props -->
<template>
  <Form.Item
    :label="props.item.title"
    :name="props.item.dataIndex"
    v-bind="props.item.formItemProps"
  >
    <ATreeSelect
      v-model:value="props.formState[item.dataIndex]"
      :placeholder="`请选择${item.title}`"
      :treeData="props.item.options"
      style="width: 183px"
      allowClear
      v-bind="props.item.fieldProps"
    />
  </Form.Item>
</template>

<script setup>
import { TreeSelect as ATreeSelect, Form } from 'ant-design-vue';

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
