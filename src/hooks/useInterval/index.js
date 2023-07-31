import { ref, watch, computed, unref, onMounted, onUnmounted } from 'vue';
import { isNumber } from '../utils';

const useInterval = (fn, delay, options = { immediate: false }) => {
  const timerRef = ref(null);

  const clear = () => {
    if (timerRef.value) {
      clearInterval(timerRef.value);
    }
  };

  const timerCallback = computed(() => unref(fn));
  const immediate = computed(() => unref(options).immediate);

  const createTime = function () {
    const delayValue = unref(delay);
    const immediateValue = unref(immediate);

    if (!isNumber(delayValue) || delayValue < 0) return;

    if (immediateValue) timerCallback.value();

    timerRef.value = setInterval(timerCallback.value, delayValue);
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
