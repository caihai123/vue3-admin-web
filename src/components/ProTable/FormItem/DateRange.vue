<!-- eslint-disable vue/no-mutating-props -->
<template>
  <Form.Item
    :label="props.item.title"
    :name="props.item.dataIndex"
    v-bind="props.item.formItemProps"
  >
    <RangePicker
      v-model:value="props.formState[item.dataIndex]"
      style="width: 250px"
      v-bind="props.item.fieldProps"
    />
  </Form.Item>
</template>

<script setup>
import { DatePicker, Form } from 'ant-design-vue';
const { RangePicker } = DatePicker;

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
