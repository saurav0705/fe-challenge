export type FilterProp<T> = {
  value: T;
  setFunction: (arg: NonNullable<T>) => void;
};
