import { FC } from "react";
import { TButtonColor } from "../Button/index.types";

export interface IColumns {
  label: string;
  name: string;
  width?: number;
  isImage?: boolean;
  offLable?: string;
  onLabel?: string;
}

export interface AdditionalActions {
  name: string;
  label: string;
  handleClick: (data?: any) => void;
  color?: TButtonColor;
}

interface ITableProps<T> {
  isEdit?: boolean;
  isDelete?: boolean;
  handleDelete?: (data: T) => void;
  handleEdit?: (data: T) => void;
  columns: IColumns[];
  rows: T[];
  dataKey: string;
  title?: string;
  isCreateButton?: boolean;
  handleCreateButton?: (data: Record<string, any>) => void;
  createLabel?: string;
  loading?: boolean;
  count?: number;
  currentPage?: number;
  totalPage?: number;
  handleChangePage?: (page: number) => void;
  additionalActions?: AdditionalActions[];
  additionalButtons?: AdditionalActions[];
  refetch: () => void;
}

export type TTable<T> = FC<ITableProps<T>>;
