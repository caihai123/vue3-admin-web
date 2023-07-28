import { ref } from 'vue';

const useBoolean = function (val = false) {
  const value = ref(!!val);

  const toggle = () => (value.value = !value.value);
  const setTrue = () => (value.value = true);
  const setFalse = () => (value.value = false);
  const set = (val) => (value.value = val);

  return [value, { toggle, setTrue, setFalse, set }];
};

export default useBoolean;
