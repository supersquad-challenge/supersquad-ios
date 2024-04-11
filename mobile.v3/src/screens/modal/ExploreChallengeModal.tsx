import { StyleSheet, Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { color } from "@/src/styles/_color";
import Header from "@/src/layout/Header";
import JoinChallenge from "@/assets/images/modal/JoinChallenge.svg";
import { WithLocalSvg } from "react-native-svg/css";
import BaseButton from "@/src/components/base/button/BaseButton";

const ExploreChallengesModal = () => {
  return (
    <StyledContainer>
      <StyledHeaderContainer>
        <Header type="basic" />
      </StyledHeaderContainer>
      <WithLocalSvg asset={JoinChallenge} />
      <StyledTitle>Congrats!</StyledTitle>
      <StyledContent>Wait up to 24h for others members</StyledContent>
      <StyledContent>to complete the last mission</StyledContent>
      <StyledContent>and calculate total reward</StyledContent>
      <StyledButtonContainer>
        <BaseButton
          title="Explore Other Challenges"
          color={color.white}
          backgroundColor={color.primary}
          borderRadius={40}
          padding="10px 35px"
          fontWeight={500}
          fontSize={16}
          handleOnPress={() => {}}
        />
      </StyledButtonContainer>
    </StyledContainer>
  );
};

export default ExploreChallengesModal;

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
  background-color: ${color.primary};
`;

const StyledTitle = styled(Text)`
  color: ${color.black};
  font-size: 24px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
`;

const StyledContent = styled(Text)`
  color: ${color.black};
  font-size: 18px;
  font-weight: 300;
  letter-spacing: -1px;
  text-align: center;
`;

const StyledButtonContainer = styled(View)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;
