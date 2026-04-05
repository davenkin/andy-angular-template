import { SortOrder } from 'common/utils/pagination.utils';
import { HttpErrorResponse } from '@angular/common/http';
import { StandardApiError } from 'common/model/common.model';

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

export function isStandardApiError(response: any) {
  return (
    response instanceof HttpErrorResponse &&
    response.error?.error?.type &&
    response.error?.error?.timestamp &&
    response.error?.error?.path
  );
}

export function standardApiErrorTypeOf(response: HttpErrorResponse) {
  if (!isStandardApiError(response)) {
    return null;
  }

  return response.error.error.type as string;
}

export function standardApiErrorOf(response: HttpErrorResponse) {
  if (!isStandardApiError(response)) {
    return null;
  }

  return response.error.error as StandardApiError;
}
