import { useEffect, useState } from 'react';
import { Store } from './Store';

export function useStore<T>(store: Store<T>): T {
  const [state, setState] = useState<T>(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe((newState) => {
      setState(newState);
    });

    return () => {
      unsubscribe();
    };
  }, [store]);

  return state;
}