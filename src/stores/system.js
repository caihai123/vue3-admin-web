import { computed } from 'vue';
import { defineStore } from 'pinia';
import { useToggle } from '@/hooks/index';

const useSystemStore = defineStore('system', () => {
  const [theme, { set, toggle }] = useToggle('light', 'dark');

  const currentTheme = localStorage.getItem('theme');
  set(currentTheme !== 'dark' ? 'light' : 'dark');

  const isLight = computed(() => theme.value !== 'dark');

  const setTheme = function (value) {
    set(value);
    localStorage.setItem('theme', theme.value);
  };

  const toggleTheme = function () {
    toggle();
    localStorage.setItem('theme', theme.value);
  };

  return { theme, isLight, setTheme, toggleTheme };
});

export default useSystemStore;
