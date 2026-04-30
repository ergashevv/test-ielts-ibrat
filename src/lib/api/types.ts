/**
 * Server response envelope for paginated lists.
 * Confirmed shape from /v1/students/:id/practicums (Round 3).
 */
export interface Paginated<T> {
  pagesCount: number;
  currentPage: number;
  totalCount: number;
  resultCount: number;
  limit: number;
  data: T[];
}

/**
 * Server response envelope for single-resource reads.
 * Confirmed shape from /user-profile, /streaks/current, /plans (Round 4).
 */
export interface Envelope<T> {
  data: T;
}

/** Empty paginated page used as a mock-mode fallback. */
export function emptyPage<T>(limit = 100): Paginated<T> {
  return {
    pagesCount: 0,
    currentPage: 1,
    totalCount: 0,
    resultCount: 0,
    limit,
    data: [],
  };
}
