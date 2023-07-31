import useState from '../useState';

const useBoolean = function (val = false) {
  const [value, set] = useState(!!val);

  const toggle = () => set(!value.value);
  const setTrue = () => set(true);
  const setFalse = () => set(false);

  return [value, { toggle, setTrue, setFalse, set }];
};

export default useBoolean;
