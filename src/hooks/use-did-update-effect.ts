import {
  useEffect,
  useRef
} from 'react';

export const useDidUpdateEffect = (effect: () => void, deps: unknown[]) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    isInitialMount.current
      ? isInitialMount.current = false
      : effect();
  }, [effect, deps]);
};
