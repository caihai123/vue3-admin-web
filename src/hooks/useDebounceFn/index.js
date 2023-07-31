import { computed, unref } from 'vue';
import { debounce } from 'throttle-debounce';
import useMemoizedFn from '../useMemoizedFn';

function useDebounceFn(fn, wait = 1000, options) {
  const callback = useMemoizedFn(fn);

  const waitLiving = computed(() => unref(wait));

  const optionsLiving = computed(() => unref(options));

  const debounced = computed(() => debounce(waitLiving.value, callback, optionsLiving.value));

  return useMemoizedFn(debounced);
}

export default useDebounceFn;
