import { View, TouchableWithoutFeedback } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { BaseBlockProps } from "@/src/types/ui/Block";

const BaseBlock = ({
  bgColor,
  radius,
  padding,
  border,
  handleOnClick,
  children,
}: BaseBlockProps) => {
  return (
    <StyledBlockContainer
      $bgColor={bgColor}
      $radius={radius}
      $padding={padding}
      $border={border}
    >
      <TouchableWithoutFeedback onPress={() => handleOnClick()}>
        {children}
      </TouchableWithoutFeedback>
    </StyledBlockContainer>
  );
};

export default BaseBlock;

type StyledBlockContainerProps = {
  $bgColor: string;
  $radius: number;
  $padding: string;
  $border: string | undefined;
};

const StyledBlockContainer = styled(View)<StyledBlockContainerProps>`
  width: 100%;
  height: 100%;
  background-color: ${({ $bgColor }) => $bgColor};
  border-radius: ${({ $radius }) => `${$radius}px`};
  padding: ${({ $padding }) => $padding};
  border: ${({ $border }) => $border};
  box-sizing: border-box;
`;
