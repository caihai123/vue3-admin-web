import { ref } from 'vue';

export const useBoolean = function (val = false) {
  const value = ref(!!val);

  const toggle = () => (value.value = !value.value);
  const setTrue = () => (value.value = true);
  const setFalse = () => (value.value = false);
  const set = (val) => (value.value = val);

  return [value, { toggle, setTrue, setFalse, set }];
};

// 默认为 boolean 切换，基础用法与 useBoolean 一致。
export const useToggle = function (leftVal = false, rightVal) {
  const value = ref(leftVal);

  const reverseValueOrigin = rightVal === undefined ? !leftVal : rightVal;

  const toggle = () => (value.value = value.value === leftVal ? reverseValueOrigin : leftVal);
  const setLeft = () => (value.value = leftVal);
  const setRight = () => (value.value = rightVal);
  const set = (val) => (value.value = val);

  return [value, { toggle, setLeft, setRight, set }];
};
