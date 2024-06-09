import { FC } from "react";
import { ILocation } from "../../../types/location.model";
import { ICreateOrEditProps } from "../../../types/base.modal";

interface ICreateLocationProps extends ICreateOrEditProps<ILocation> {}

export type TCreateLocation = FC<ICreateLocationProps>;
