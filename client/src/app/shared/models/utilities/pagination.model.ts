export interface PageResult<T> {
  count: number;
  pageIndex: number;
  pageSize: number;
  items: T[];
}
