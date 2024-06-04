export const getSearchParamsFilters = (searchParams: URLSearchParams) => {
  const data: string[] = [];
  searchParams.forEach((value, key) => {
    console.log("the value is", value, typeof value);
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
  console.log("calledprepareSearchParamsData");
  Object.keys(data).forEach(
    (key) => data[key] === undefined && delete data[key]
  );
  console.log("the data is", data);
  return data;
};
