export const getSearchParamsFilters = (searchParams: URLSearchParams) => {
  const data: string[] = [];
  searchParams.forEach((value, key) => {
    if (value && value !== "undefiend") {
      if (key === "page") {
        data.push(`${key}=${+value - 1}`);
      } else {
        data.push(`${key}=${value}`);
      }
    }
  });
  return data.join(",");
};

export const prepareSearchParamsData = <T extends Object>(data: T): T => {
  Object.keys(data).forEach(
    (key) => data[key] === undefined && delete data[key]
  );
  return data;
};

export const prepareObjectSearchParamsFilters = <T extends URLSearchParams>(
  data: T
) => {
  const query: Object[] = [];
  data.forEach((value, key) => {
    if (value && key && value !== "undefined" && key !== "page") {
      console.log("calleds", `${key}.eq=${value}`);
      query.push(`${key}.eq=${value}`);
    } else if (key === "page") {
      query.push(`${key}=${+value - 1}`);
    }
  });
  console.log("callled", query, query.join(","));
  return query.join("&");
};
