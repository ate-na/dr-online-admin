import { FC } from "react";
import { ICategory } from "../../../types/category.modal";

export interface IFilterCategory {
  open?: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
}

export type TFilterCategoryFormValidation = Partial<
  Pick<ICategory, "enName" | "faName">
>;

export type TFilterCategory = FC<IFilterCategory>;
