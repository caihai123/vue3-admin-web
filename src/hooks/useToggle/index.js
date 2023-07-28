import { ref } from 'vue';

// 默认为 boolean 切换，基础用法与 useBoolean 一致。
const useToggle = function (leftVal = false, rightVal) {
  const value = ref(leftVal);

  const reverseValueOrigin = rightVal === undefined ? !leftVal : rightVal;

  const toggle = () => (value.value = value.value === leftVal ? reverseValueOrigin : leftVal);
  const setLeft = () => (value.value = leftVal);
  const setRight = () => (value.value = rightVal);
  const set = (val) => (value.value = val);

  return [value, { toggle, setLeft, setRight, set }];
};

export default useToggle;
