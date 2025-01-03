const parseQueryParams = <T extends Record<string, unknown>>(query: Record<string, unknown>): T => {
  const queryParams: Partial<T> = {};

  for (const key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      queryParams[key as keyof T] = query[key] as T[keyof T];
    }
  }

  return queryParams as T;
};

export default parseQueryParams;
