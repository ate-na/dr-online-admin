import { FC } from "react";
import { ICategory } from "../../../types/category.modal";
import { ICreateOrEditProps } from "../../../types/base.modal";

export interface ICreateCategoryProps extends ICreateOrEditProps<ICategory> {}

export type TCreateCategory = FC<ICreateCategoryProps>;
