import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { styled } from "styled-components/native";
import { color } from "@/src/styles/_color";
import { WithLocalSvg } from "react-native-svg/css";
import ArrowBack from "@/assets/images/arrow-left.svg";

type Props = {
  type: "basic" | "back";
  returnUrl?: string;
};

const Header = ({ type, returnUrl }: Props) => {
  const navigation = useNavigation();

  return (
    <StyledHeaderContainer $type={type === "basic" ? true : false}>
      {type === "basic" ? (
        <StyledHeaderTitle style={{ fontFamily: "ClashDisplayVariable" }}>
          SUPERSQUAD
        </StyledHeaderTitle>
      ) : (
        <StyledIconContainer>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <WithLocalSvg asset={ArrowBack} />
          </TouchableOpacity>
        </StyledIconContainer>
      )}
    </StyledHeaderContainer>
  );
};

type StyledHeaderContainerProps = {
  $type: boolean;
};

const StyledHeaderContainer = styled(View)<StyledHeaderContainerProps>`
  width: 100%;
  height: 80px;
  background-color: transparent;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledHeaderTitle = styled(Text)`
  color: ${color.white};
  font-size: 21px;
  font-family: ClashDisplayVariable;
`;

const StyledIconContainer = styled(View)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 22px;
`;

export default Header;
