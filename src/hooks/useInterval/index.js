import { ref, watch, computed, unref, onMounted, onUnmounted } from 'vue';
import useMemoizedFn from '../useMemoizedFn';
import { isNumber } from '../utils';

const useInterval = (fn, delay, options = { immediate: false }) => {
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
