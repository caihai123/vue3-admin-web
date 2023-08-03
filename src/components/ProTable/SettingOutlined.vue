<template>
  <Popover :arrow="false" placement="bottomRight" trigger="click">
    <template #content>
      <div style="min-width: 176px">
        <div style="display: flex; justify-content: space-between">
          <Checkbox :indeterminate="indeterminate" @change="onCheckAllChange" :checked="checkAll">
            列展示
          </Checkbox>
          <Button
            type="link"
            style="height: 22px; lineheight: 1; padding: 0"
            @click="() => onCheckChange(plainOptions)"
          >
            重置
          </Button>
        </div>
        <Divider style="margin: 4px 0" />
        <Checkbox.Group
          :value="props.value"
          @change="(keys) => onCheckChange(keys)"
          style="display: block"
        >
          <Checkbox
            v-for="item in props.options"
            style="display: flex; margin: 0"
            :value="item.value"
            :key="item.value"
          >
            {{ item.label }}
          </Checkbox>
        </Checkbox.Group>
      </div>
    </template>
    <slot />
  </Popover>
</template>

<script setup>
import { computed } from 'vue';
import { useState } from '@/hooks/index';
import { Popover, Checkbox, Divider, Button } from 'ant-design-vue';

const props = defineProps({
  value: {
    type: Array,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(['change']);

const plainOptions = computed(() => props.options.map((item) => item.value));

const [indeterminate, setIndeterminate] = useState(false);
const [checkAll, setCheckAll] = useState(true);

const onCheckAllChange = (e) => {
  emit('change', e.target.checked ? plainOptions.value : []);
  setIndeterminate(false);
  setCheckAll(e.target.checked);
};

const onCheckChange = (list) => {
  emit('change', list);
  setIndeterminate(!!list.length && list.length < plainOptions.value.length);
  setCheckAll(list.length === plainOptions.value.length);
};
</script>
