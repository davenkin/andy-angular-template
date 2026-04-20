import { SortOrder } from 'common/utils/pagination.utils';

export function randomOf<T>(values: T[]) {
  return values[Math.floor(Math.random() * values.length)];
}

export function simpleSortByField<T>(arr: T[], sortField: keyof T, sortOrder = SortOrder.ASC) {
  const direction = sortOrder === SortOrder.ASC ? 1 : -1;

  return [...arr].sort((a, b) => {
    if (a[sortField] < b[sortField]) return -1 * direction;
    if (a[sortField] > b[sortField]) return 1 * direction;
    return 0;
  });
}
