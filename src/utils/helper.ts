import { ICategory } from "../types/category.modal";

export const totalPage = (count: number) =>
  count % 10 >= 5 ? Math.round(count / 10) : Math.round(count / 10) + 1;

export const prepareFormDataValue = (data: ICategory) => {
  const formData = new FormData();
  Object.keys(data).map((e)=>{})
};
