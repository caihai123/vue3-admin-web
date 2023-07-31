import { ref, watch, onMounted, onUnmounted, unref } from 'vue';
import useMemoizedFn from '../useMemoizedFn';
import { isNumber } from '../utils';

const useTimeout = (fn, delay) => {
  const timerCallback = useMemoizedFn(fn);
  const timerRef = ref(null);

  // 创建setTimeout
  const createTime = () => {
    const delayValue = unref(delay);
    if (!isNumber(delayValue) || delayValue < 0) {
      return;
    }
    timerRef.value = setTimeout(timerCallback, delayValue);
  };

  const clear = () => {
    if (timerRef.value) {
      clearTimeout(timerRef.value);
    }
  };

  // 组件挂载完成后执行首次创建setTimeout
  onMounted(() => {
    createTime();
  });

  // delay 改变后清除之前的setTimeout，然后重新创建
  watch(delay, () => {
    clear();
    createTime();
  });

  // 组件实例被卸载之后清除 setTimeout
  onUnmounted(() => {
    clear();
  });

  return clear;
};

export default useTimeout;
