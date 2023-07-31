import { ref } from 'vue';

// 模拟react的体验
const useState = function (defaultValue) {
  const value = ref(defaultValue);

  const set = function (val) {
    value.value = val;
  };

  return [value, set];
};

export default useState;
