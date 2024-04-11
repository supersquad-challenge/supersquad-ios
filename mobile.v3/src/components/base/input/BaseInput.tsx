import { TextInput, View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { BaseInputProps } from "@/src/types/ui/Input";

const BaseInput = ({
  color,
  fontSize,
  padding,
  border,
  borderRadius,
  value,
  placeholder,
  handleOnChange,
  handleOnSubmit,
  handleEndEditing,
}: BaseInputProps) => {
  return (
    <StyledInputContainer>
      <StyledInputBody
        value={value}
        placeholder={placeholder}
        placeholderTextColor={"#ccc"}
        onChangeText={(text) => handleOnChange(text)}
        onEndEditing={() => handleEndEditing()}
        onSubmitEditing={() => handleOnSubmit()}
        $color={color}
        $border={border || "none"}
        $fontSize={fontSize}
        $padding={padding}
        $radius={borderRadius || 0}
        cursorColor={color}
      />
    </StyledInputContainer>
  );
};

export default BaseInput;

const StyledInputContainer = styled(View)`
  width: 100%;
  min-width: 70px;
  height: 100%;
  min-height: 30px;
  text-align: left;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

type StyledInputBodyProps = {
  $border: string;
  $radius: number;
  $fontSize: number;
  $color: string;
  $padding: string;
};

const StyledInputBody = styled(TextInput)<StyledInputBodyProps>`
  width: 100%;
  height: 100%;
  font-size: ${({ $fontSize }) => `${$fontSize}px`};
  color: ${({ $color }) => $color};
  padding: ${({ $padding }) => $padding};
  border: ${({ $border }) => $border};
  border-radius: ${({ $radius }) => `${$radius}px`};
`;
