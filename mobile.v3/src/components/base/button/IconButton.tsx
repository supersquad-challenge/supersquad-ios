import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { IconButtonProps } from "@/src/types/ui/Button";
import styled from "styled-components/native";

const IconButton = ({
  handleOnClick,
  children,
  size,
  radius,
}: IconButtonProps) => {
  return (
    <StyledContainer
      $size={size}
      $radius={radius}
      onPress={() => handleOnClick()}
    >
      {children}
    </StyledContainer>
  );
};

export default IconButton;

type StyledContainerProps = {
  $size: number;
  $radius: number;
};

const StyledContainer = styled(TouchableOpacity)<StyledContainerProps>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  border-radius: ${({ $radius }) => `${$radius}px`};
  display: flex;
  align-items: center;
  justify-content: center;
`;
