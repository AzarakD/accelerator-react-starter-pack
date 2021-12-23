import {
  useEffect,
  useRef
} from 'react';

export const useDidMountEffect = (effect: () => void) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!isInitialMount.current) {
      return;
    }
    isInitialMount.current = false;
    effect();
  }, [effect]);
};
