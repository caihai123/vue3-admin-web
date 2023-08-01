import { computed } from 'vue';
import useMemoizedFn from '../useMemoizedFn';
import useRequest from '../useRequest';

const usePagination = function (fn, options) {
  const service = useMemoizedFn(fn);
  const { defaultPageSize = 10, defaultCurrent = 1, ...rest } = options;

  const result = useRequest(service, {
    defaultParams: [{ current: defaultCurrent, pageSize: defaultPageSize }],
    refreshDepsAction: () => {
      changeCurrent(1);
    },
    ...rest,
  });

  const current = computed(() => (result.params[0] || {}).current);
  const pageSize = computed(() => (result.params[0] || {}).pageSize || defaultPageSize);
  const total = computed(() => result.data?.total || 0);
  const totalPage = computed(() => Math.ceil(total.value / pageSize.value));

  const onChange = (c, p) => {
    let toCurrent = c <= 0 ? 1 : c;
    const toPageSize = p <= 0 ? 1 : p;
    const tempTotalPage = Math.ceil(total.value / toPageSize);
    if (toCurrent > tempTotalPage) {
      toCurrent = Math.max(1, tempTotalPage);
    }

    const [oldPaginationParams = {}, ...restParams] = result.params.value || [];

    result.run(
      {
        ...oldPaginationParams,
        current: toCurrent,
        pageSize: toPageSize,
      },
      ...restParams
    );
  };

  const changeCurrent = (c) => {
    onChange(c, pageSize.value);
  };

  const changePageSize = (p) => {
    onChange(current.value, p);
  };

  return {
    ...result,
    pagination: {
      current,
      pageSize,
      total,
      totalPage,
      onChange: useMemoizedFn(onChange),
      changeCurrent: useMemoizedFn(changeCurrent),
      changePageSize: useMemoizedFn(changePageSize),
    },
  };
};

export default usePagination;
