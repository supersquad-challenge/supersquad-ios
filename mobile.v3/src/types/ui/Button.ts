import { ReactNode } from "react";

export type BaseButtonProps = {
  title: string;
  handleOnPress: () => void;
  color: string;
  fontSize: number;
  fontWeight: number;
  borderRadius: number;
  backgroundColor: string;
  padding: string;
  children?: ReactNode;
};

export type IconButtonProps = {
  handleOnClick: () => void;
  children: ReactNode;
  size: number;
  radius: number;
};
