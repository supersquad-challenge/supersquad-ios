import { Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { color } from "@/src/styles/_color";

type Props = {
  handleOnClick: () => void;
  title: string;
};

const FullButton = ({ handleOnClick, title }: Props) => {
  return (
    <StyledButtonContainer onPress={() => handleOnClick()}>
      <StyledButtonTitle>{title}</StyledButtonTitle>
    </StyledButtonContainer>
  );
};

const StyledButtonContainer = styled(TouchableOpacity)`
  width: 100%;
  height: 80px;
  background-color: ${color.primary};
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;

const StyledButtonTitle = styled(Text)`
  color: ${color.white};
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

export default FullButton;
