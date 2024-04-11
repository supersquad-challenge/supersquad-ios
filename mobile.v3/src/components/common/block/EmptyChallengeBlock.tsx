import { StyleSheet, Text, View } from "react-native";
import React from "react";
import EmptyChallenge from "@/assets/images/block/EmptyChallenge.svg";
import styled from "styled-components/native";
import { WithLocalSvg } from "react-native-svg/css";
import { color } from "@/src/styles/_color";

const EmptyChallengeBlock = () => {
  return (
    <StyledBlockContainer>
      <WithLocalSvg asset={EmptyChallenge} />
      <StyledTitle>Sorry, there is no challenge.</StyledTitle>
      <StyledContent>Go to explorer and join new Challenge</StyledContent>
    </StyledBlockContainer>
  );
};

export default EmptyChallengeBlock;

const StyledBlockContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const StyledTitle = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  color: ${color.black};
  margin-top: 25px;
`;

const StyledContent = styled(Text)`
  font-size: 15px;
  font-weight: 400;
  color: ${color.gray};
`;
