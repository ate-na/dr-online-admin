import { FC, PropsWithChildren } from "react";

interface IModal extends PropsWithChildren{
  open: boolean;
  handleClose: () => void;
  title: string;
  width?:string
  height?:string
  flexDirection?:any
  justifyContent?:string,
  alignItems?:string
  bgcolor?:string
  p?:number
}

export type TModal = FC<IModal>;
