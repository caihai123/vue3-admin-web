import { ref, watch, computed, unref, onMounted, onUnmounted } from 'vue';
import useMemoizedFn from '../useMemoizedFn';
import { isNumber } from '../utils';

const useInterval = (fn, delay, options = { immediate: false }) => {
  // 使用useMemoizedFn可保证fn更新时timerCallback的地址永远不会变化
  // 所以也不需要像delay一样使用watch检测fn的改变后重新注册定时器
  // 这样的好处在于可以动态修改fn的同时不会打断定时器的进程
  const timerCallback = useMemoizedFn(fn);

  const immediate = computed(() => unref(options).immediate);

  const timerRef = ref(null);

  const createTime = function () {
    const delayValue = unref(delay);
    const immediateValue = unref(immediate);

    if (!isNumber(delayValue) || delayValue < 0) return;

    if (immediateValue) timerCallback();

    timerRef.value = setInterval(timerCallback, delayValue);
  };

  const clear = () => {
    if (timerRef.value) {
      clearInterval(timerRef.value);
    }
  };

  onMounted(() => {
    createTime();
  });

  watch([delay, immediate], () => {
    clear();
    createTime();
  });

  onUnmounted(() => {
    clear();
  });

  return clear;
};

export default useInterval;
