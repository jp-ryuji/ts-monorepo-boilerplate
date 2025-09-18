// Base factory interface - adapted for DDD entities with private properties
export interface BaseFactory<T> {
  build(params?: Partial<Record<string, any>>): T;
  buildList(num: number, params?: Partial<Record<string, any>>): T[];
  create(params?: Partial<Record<string, any>>): Promise<T>;
  createList(num: number, params?: Partial<Record<string, any>>): Promise<T[]>;
}
