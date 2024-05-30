export const totalPage = (count: number) =>
  count % 10 >= 5 ? Math.round(count / 10) : Math.round(count / 10) + 1;
