import { computed, unref } from 'vue';

/**
 * 用于同时保证函数地址永远不会变化。
 * 灵感来自ahooks中的useMemoizedFn，但是没有记忆功能，因为vue不需要。
 * 大部分场景你应该不需要它，vue3不像react那样每次渲染都会重新调用hooks，这也是此函数不需要记忆功能的原因。参考：https://cn.vuejs.org/guide/extras/composition-api-faq.html#comparison-with-react-hooks
 */
function useMemoizedFn(fn) {
  const fnRef = computed(() => {
    return unref(fn);
  });

  return (...args) => fnRef.value(...args);
}

export default useMemoizedFn;
