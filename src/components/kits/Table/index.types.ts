import { FC } from "react";

interface IColumns {
  label: string;
  name: string;
  width?: number;
}

interface ITableProps<T> {
  isEdit?: boolean;
  isDelete?: boolean;
  handleDelete?: (data: Record<string, any>) => void;
  handleEdit?: (data: Record<string, any>) => void;
  columns: IColumns[];
  rows: T[];
  dataKey: string;
  title?: string;
  isCreateButton?: boolean;
  handleCreateButton?: (data: Record<string, any>) => void;
  createLabel?: string;
  loading?: boolean;
  count?: number;
}

export type TTable<T> = FC<ITableProps<T>>;
