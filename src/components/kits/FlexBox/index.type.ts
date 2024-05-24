import { BoxProps } from "@mui/material";
import { FC, PropsWithChildren } from "react";

interface ICustomFlexBoxProps extends PropsWithChildren, BoxProps {
  justifyContent?: string;
  alignItems?: string;
}

export type TCustomFlexBoxFC = FC<ICustomFlexBoxProps>;
