export interface Observer<T> {
  updateOnObservableNotification(data: T): void;
}
