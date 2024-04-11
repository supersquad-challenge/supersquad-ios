import {
  Text,
  TextProps,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native";
import React, { FC } from "react";
import { BaseButtonProps } from "@/src/types/ui/Button";
import styled from "styled-components/native";

const BaseButton = ({
  title,
  handleOnPress,
  color,
  fontSize,
  fontWeight,
  borderRadius,
  backgroundColor,
  padding,
  children,
}: BaseButtonProps) => {
  return (
    <StyledButton
      $borderRadius={borderRadius}
      $backgroundColor={backgroundColor}
      $padding={padding}
      onPress={() => handleOnPress()}
    >
      <StyledText $color={color} $fontSize={fontSize} $fontWeight={fontWeight}>
        {title}
      </StyledText>
      {children}
    </StyledButton>
  );
};

export default BaseButton;

type StyledButtonProps = TouchableOpacityProps & {
  $borderRadius: number;
  $backgroundColor: string;
  $padding: string;
};

const StyledButton = styled(TouchableOpacity)<StyledButtonProps>`
  width: 100%;
  min-width: 50px;
  height: 100%;
  text-align: center;
  border: none;
  transition: all ease 0.2s;
  border-radius: ${({ $borderRadius }) => `${$borderRadius}px`};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  padding: ${({ $padding }) => $padding};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type StyledTextProps = TextProps & {
  $color: string;
  $fontSize: number;
  $fontWeight: number;
};

const StyledText = styled(Text)<StyledTextProps>`
  color: ${({ $color }) => $color};
  font-size: ${({ $fontSize }) => `${$fontSize}px`};
  font-weight: ${({ $fontWeight }) => $fontWeight};
`;
