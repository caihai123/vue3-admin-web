<template>
  <Menu :items="menuList" mode="inline" @click="handleClick" />
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
import { onMounted } from 'vue'
import { Menu } from 'ant-design-vue'
import router from '@/router/index'
import useAsyncMenuStore from '@/stores/async-routes'

const { menu, updateMenu } = useAsyncMenuStore()

const menuList = computed(() => {
  const initialMenuList = menu.data || []
  return initialMenuList.map((item) => getItem(item))
})

onMounted(() => updateMenu())

const handleClick = function ({ key }) {
  router.push(key)
}
</script>
