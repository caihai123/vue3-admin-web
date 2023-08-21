<!-- eslint-disable vue/no-mutating-props -->
<template>
  <Form.Item
    :label="props.item.title"
    :name="props.item.dataIndex"
    v-bind="props.item.formItemProps"
  >
    <ACheckbox.Group
      v-model:value="props.formState[item.dataIndex]"
      :options="props.item.options"
      v-bind="props.item.fieldProps"
    ></ACheckbox.Group>
  </Form.Item>
</template>

<script setup>
import { Checkbox as ACheckbox, Form } from 'ant-design-vue';

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
