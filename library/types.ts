export type Listener<T> = (state: T) => void;
export type Unsubscribe = () => void;