import { Text, View } from "react-native";
import React from "react";
import { BaseTagProps } from "@/src/types/ui/Tag";
import styled from "styled-components/native";

const BaseTag = ({ bgColor, color, title }: BaseTagProps) => {
  return (
    <StyledTagContainer $bgColor={bgColor}>
      <StyledTagTitle $color={color}>{title}</StyledTagTitle>
    </StyledTagContainer>
  );
};

export default BaseTag;

type StyledTagContainerProps = {
  $bgColor: string;
};

const StyledTagContainer = styled(View)<StyledTagContainerProps>`
  padding: 7px 10px;
  background-color: ${({ $bgColor }) => $bgColor};
  border-radius: 10px;
  height: 32px;
  margin-left: 10px;
  box-sizing: border-box;
`;

type StyledTagTitleProps = {
  $color: string;
};

const StyledTagTitle = styled(Text)<StyledTagTitleProps>`
  color: ${({ $color }) => $color};
  font-size: 14px;
  font-weight: 500;
`;
