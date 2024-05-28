import { FC } from "react";
import { ILocation } from "../../../types/location.model";

interface ICreateLocationProps {
  open: boolean;
  handleClose: () => void;
  data?:ILocation
}

export type TCreateLocation = FC<ICreateLocationProps>;
