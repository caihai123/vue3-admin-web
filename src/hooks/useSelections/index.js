import { computed, unref } from 'vue';
import useState from '../useState';
import useMemoizedFn from '../useMemoizedFn';

// 常见联动 Checkbox 逻辑封装，支持多选，单选，全选逻辑，还提供了是否选择，是否全选，是否半选的状态。
// 文档可参考：https://ahooks.js.org/zh-CN/hooks/use-selections
export default function useSelections(items = [], defaultSelected = []) {
  const allItems = computed(() => unref(items));

  const [selected, setSelected] = useState(unref(defaultSelected));

  const selectedSet = computed(() => new Set(selected.value));

  const isSelected = (item) => selectedSet.value.has(item);

  const select = (item) => {
    selectedSet.value.add(item);
    return setSelected(Array.from(selectedSet.value));
  };

  const unSelect = (item) => {
    selectedSet.value.delete(item);
    return setSelected(Array.from(selectedSet.value));
  };

  const toggle = (item) => {
    if (isSelected(item)) {
      unSelect(item);
    } else {
      select(item);
    }
  };

  const selectAll = () => {
    allItems.value.forEach((o) => {
      selectedSet.value.add(o);
    });
    setSelected(Array.from(selectedSet.value));
  };

  const unSelectAll = () => {
    allItems.value.forEach((o) => {
      selectedSet.value.delete(o);
    });
    setSelected(Array.from(selectedSet.value));
  };

  const noneSelected = computed(() => allItems.value.every((o) => !selectedSet.value.has(o)));

  const allSelected = computed(
    () => allItems.value.every((o) => selectedSet.value.has(o)) && !noneSelected.value
  );

  const partiallySelected = computed(() => !noneSelected.value && !allSelected.value);

  const toggleAll = () => (allSelected.value ? unSelectAll() : selectAll());

  return {
    selected,
    noneSelected,
    allSelected,
    partiallySelected,
    setSelected,
    isSelected,
    select: useMemoizedFn(select),
    unSelect: useMemoizedFn(unSelect),
    toggle: useMemoizedFn(toggle),
    selectAll: useMemoizedFn(selectAll),
    unSelectAll: useMemoizedFn(unSelectAll),
    toggleAll: useMemoizedFn(toggleAll),
  };
}
