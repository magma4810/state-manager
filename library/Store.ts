import { Listener, Unsubscribe } from './types';

export class Store<T> {
  private state: T;
  private listeners: Listener<T>[] = [];

  constructor(initialState: T) {
    this.state = initialState;
  }

  public getState(): T {
    return this.state;
  }

  public setState(newState: T): void {
    this.state = newState;
    this.notifyListeners();
  }

  public updateState(updater: (currentState: T) => T): void {
    this.state = updater(this.state);
    this.notifyListeners();
  }

  public subscribe(listener: Listener<T>): Unsubscribe {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.state));
  }
}