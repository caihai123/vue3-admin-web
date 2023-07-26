import { ref } from 'vue'
import { defineStore } from 'pinia'

const useSystemStore = defineStore('system', () => {
  const theme = ref(localStorage.getItem('theme'))

  const setTheme = function (value) {
    theme.value = value || theme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', theme.value)
  }

  return { theme, setTheme }
})

export default useSystemStore
