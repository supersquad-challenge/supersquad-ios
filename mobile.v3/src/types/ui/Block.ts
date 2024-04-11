import { ReactNode } from "react";

export type BaseBlockProps = {
  bgColor: string;
  children: ReactNode;
  radius: number;
  padding: string;
  border?: string;
  handleOnClick: () => void;
};
