import { FC } from "react";
import { ICategory } from "../../../types/category.modal";

export interface ICreateCategoryProps {
  open?: boolean;
  handleClose: () => void;
  data?: ICategory;
}

export type TCreateCategory = FC<ICreateCategoryProps>;
