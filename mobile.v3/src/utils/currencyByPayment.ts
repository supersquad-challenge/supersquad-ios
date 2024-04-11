import { PaymentMethodType } from "~/types/ui/Modal";

export const getCurrencyByPayment = (method: PaymentMethodType | undefined) => {
  if (!method) return "";
  if (method == "crypto") {
    return "MATIC";
  } else if (method == "cash") {
    return "$USD";
  }
};
