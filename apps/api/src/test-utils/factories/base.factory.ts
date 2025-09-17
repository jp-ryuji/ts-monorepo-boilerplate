// Base factory interface
export interface BaseFactory<T> {
  build(params?: Partial<T>): T;
  buildList(num: number, params?: Partial<T>): T[];
  create(params?: Partial<T>): Promise<T>;
  createList(num: number, params?: Partial<T>): Promise<T[]>;
}
