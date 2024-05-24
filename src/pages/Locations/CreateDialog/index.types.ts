import { FC } from "react";

interface ICreateLocationProps {
  open: boolean;
  handleClose: () => void;
  

}

export type TCreateLocation = FC<ICreateLocationProps>;
