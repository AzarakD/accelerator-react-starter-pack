import {
  useEffect,
  useRef
} from 'react';

export const useDidUpdateEffect = (effect: () => void, deps: unknown) => {
  const isInitialMount = useRef(false);

  useEffect(() => {
    isInitialMount.current
      ? effect()
      : isInitialMount.current = true;
  }, [effect, deps]);
};
