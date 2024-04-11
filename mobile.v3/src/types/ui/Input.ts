export type BaseInputProps = {
  value: string;
  handleOnChange: (text: string) => void;
  handleOnSubmit: () => void;
  handleEndEditing: () => void;
  color: string;
  fontSize: number;
  padding: string;
  placeholder: string;
  border: string | undefined;
  borderRadius: number | undefined;
};
