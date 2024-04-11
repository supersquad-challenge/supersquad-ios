import { ReactNode } from "react";

export type BaseModalProps = {
  title: string;
  deletePath: string | undefined;
  children: ReactNode;
};

export type ModalType =
  | "PaymentSelect"
  | "DepositCharge"
  | "JoinChallenge"
  | "SubmitPhoto"
  | "ChallengeStatus"
  | "ExploreChallenges";

export type PaymentMethodType = "crypto" | "cash";
