import {
  useEffect,
  useRef
} from 'react';

export const useDidUpdateEffect = (func: () => void, deps: unknown) => {
  const isInitialMount = useRef(false);

  useEffect(() => {
    isInitialMount.current
      ? func()
      : isInitialMount.current = true;
  }, [func, deps]);
};
