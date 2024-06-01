export const getSearchParamsFilters = (searchParams: URLSearchParams) => {
  const data: string[] = [];
  searchParams.forEach((value, key) => {
    if (key === "page") {
      data.push(`${key}=${+value - 1}`);
    } else {
      data.push(`${key}=${value}`);
    }
  });
  return data.join(",");
};
