import { Text, View, TouchableWithoutFeedback } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components/native";
import { color } from "@/src/styles/_color";

type Props = {
  handleOnClick: (param: string) => void;
  title: string;
  isSelected: boolean;
  children: React.ReactNode;
};

const Category = ({ title, children, isSelected, handleOnClick }: Props) => {
  const _title = title === "Mental_health" ? "Mental Health" : title;
  return (
    <StyledContainer>
      <TouchableWithoutFeedback
        onPress={() => {
          handleOnClick(title);
        }}
      >
        <StyledImageContainer $size={70} $isActive={isSelected}>
          {children}
        </StyledImageContainer>
      </TouchableWithoutFeedback>
      <StyledCategoryTitle>{_title}</StyledCategoryTitle>
    </StyledContainer>
  );
};

export default Category;

const StyledContainer = styled(View)`
  width: auto;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

type StyledImageContainerProps = {
  $isActive: boolean;
  $size: number;
};

const StyledImageContainer = styled(View)<StyledImageContainerProps>`
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ $size }) => `${$size / 2}px`};
  background-color: ${({ $isActive }) =>
    $isActive ? `${color.highlight}` : "rgba(255, 255, 255, 0.4)"};
`;

const StyledCategoryTitle = styled(Text)`
  color: ${color.white};
  font-size: 14px;
  font-weight: 600;
  max-width: 50px;
  margin-top: 10px;
  text-align: center;
`;
