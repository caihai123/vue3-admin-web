import useState from '../useState';

// 默认为 boolean 切换，基础用法与 useBoolean 一致。
const useToggle = function (leftVal = false, rightVal) {
  const [value, set] = useState(leftVal);

  const reverseValueOrigin = rightVal === undefined ? !leftVal : rightVal;

  const toggle = () => set(value.value === leftVal ? reverseValueOrigin : leftVal);
  const setLeft = () => set(leftVal);
  const setRight = () => set(rightVal);

  return [value, { toggle, setLeft, setRight, set }];
};

export default useToggle;
