import { StyleSheet, Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { color } from "@/src/styles/_color";
import JoinChallenge from "@/assets/images/modal/JoinChallenge.svg";
import Header from "@/src/layout/Header";
import { WithLocalSvg } from "react-native-svg/css";
import BaseButton from "@/src/components/base/button/BaseButton";

const CompleteChallengeModal = () => {
  return (
    <StyledContainer>
      <StyledHeaderContainer>
        <Header type="back" />
      </StyledHeaderContainer>
      <WithLocalSvg asset={JoinChallenge} />
      <StyledTitle>Congrats!</StyledTitle>
      <StyledContent>You have completed today’s challenge!</StyledContent>
      <StyledButtonContainer>
        <BaseButton
          title="Check Your Status"
          color={color.white}
          backgroundColor={color.primary}
          borderRadius={40}
          padding="10px 70px"
          fontWeight={500}
          fontSize={16}
          handleOnPress={() => {}}
        />
      </StyledButtonContainer>
    </StyledContainer>
  );
};

export default CompleteChallengeModal;

const StyledContainer = styled(View)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${color.white};
  position: relative;
`;

const StyledHeaderContainer = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledTitle = styled(Text)`
  color: ${color.black};
  font-size: 25px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const StyledContent = styled(Text)`
  color: ${color.black};
  font-size: 20px;
  font-weight: 300;
  letter-spacing: -1px;
  margin-bottom: 15px;
`;

const StyledButtonContainer = styled(View)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;
