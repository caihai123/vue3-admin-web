export default function FormItem({ item }) { }

<template>
  <Node />
</template>

<script setup>
import { h, computed } from 'vue';
import Input from './Input.vue';
import Select from './Select.vue';
import Checkbox from './Checkbox.vue';
import Radio from './Radio.vue';
import Date from './Date.vue';
import DateRange from './DateRange.vue';
import TreeSelect from './TreeSelect.vue';

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

const Node = computed(() => {
  const { item } = props;
  if (item.renderFormItem) {
    return item.renderFormItem(...props);
  } else {
    switch (item.type) {
      case 'select':
        return h(Select, props);
      case 'checkbox':
        return h(Checkbox, props);
      case 'radio':
        return h(Radio, props);
      case 'date':
        return h(Date, props);
      case 'dateRange':
        return h(DateRange, props);
      case 'treeSelect':
        return h(TreeSelect, props);
      default:
        return h(Input, props);
    }
  }
});
</script>
