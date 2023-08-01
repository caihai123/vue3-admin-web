import { onMounted, watch } from 'vue';
import useState from '../useState';
import { isFunction } from '../utils/index';
import useMemoizedFn from '../useMemoizedFn';
import useLoadingDelayAndKeep from '../useLoadingDelayAndKeep';

const defaultOptions = {
  manual: false,
  defaultParams: [],
  onBefore: () => null,
  onSuccess: () => null,
  onError: () => null,
  onFinally: () => null,
  loadingDelay: 300,
  loadingKeep: 500,
  refreshDeps: [],
};

export default function useRequest(fn, options) {
  const service = useMemoizedFn(fn);
  const _options = Object.assign(defaultOptions, options);

  const [count, setCount] = useState(0);
  const [data, setData] = useState(undefined);
  const [loading, { setTrue: setLoadingTrue, setFalse: setLoadingFalse }] = useLoadingDelayAndKeep(
    false,
    { delay: _options.loadingDelay, keep: _options.loadingKeep }
  );
  const [error, setError] = useState(undefined);
  const [params, setParams] = useState([]);

  onMounted(() => {
    if (!_options.manual) {
      const args = params.value || _options.defaultParams || [];
      run(...args);
    }
  });

  // 与 run 用法一致，但返回的是 Promise，需要自行处理异常。
  const runAsync = function (...args) {
    setCount(count.value + 1);
    const currentCount = count.value;

    setLoadingTrue();
    setParams(args);
    _options.onBefore?.(args);

    return new Promise((resolve, reject) => {
      service(...args)
        .then((data) => {
          if (currentCount !== count.value) return;
          setData(data);
          setError(undefined);
          _options.onSuccess?.(data, args);
          resolve(data);
        })
        .catch((error) => {
          if (currentCount !== count.value) return;
          setError(error);
          _options.onError?.(error, args);
          reject(error);
        })
        .finally(() => {
          setLoadingFalse();
          _options.onFinally?.(args, data, error);
        });
    });
  };

  // 手动触发 service 执行，参数会传递给 service
  const run = function (...args) {
    runAsync(...args);
  };

  // 使用上一次的 params，重新调用 run
  const refresh = function () {
    run(...params.value);
  };

  // 使用上一次的 params，重新调用 runAsync
  const refreshAsync = function () {
    runAsync(...params.value);
  };

  // 直接修改 data
  const mutate = function (newData) {
    const targetData = isFunction(newData) ? newData(data) : newData;
    setData(targetData);
  };

  // 忽略当前 Promise 的响应
  const cancel = function () {
    setCount(count.value + 1);
    setLoadingFalse();
  };

  // 检测依赖刷新
  watch(options.refreshDeps, () => refresh());

  return {
    data,
    loading,
    error,
    params,
    run,
    runAsync: useMemoizedFn(runAsync),
    refresh: useMemoizedFn(refresh),
    refreshAsync: useMemoizedFn(refreshAsync),
    mutate: useMemoizedFn(mutate),
    cancel: useMemoizedFn(cancel),
  };
}
