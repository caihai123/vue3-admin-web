<template>
  <Menu :items="menuList" mode="inline" />
</template>

<script>
import { h, computed } from 'vue'
import * as icons from '@ant-design/icons-vue'

// 动态渲染icon
const antdIcon = function (icon) {
  return icon && h(icons[icon])
}
const getItem = function ({ id, type, title, path, children, icon }) {
  return {
    key: path || id,
    label: title,
    icon: icon ? antdIcon(icon) : '',
    children: type === '2' ? (children || []).map((item) => getItem(item)) : undefined
  }
}
</script>

<script setup>
import { Menu } from 'ant-design-vue'

const props = defineProps({
  menu: {
    type: Object,
    required: true
  }
})

const menuList = computed(() => {
  const initialMenuList = props.menu.list || []
  return initialMenuList.map((item) => getItem(item))
})
</script>
