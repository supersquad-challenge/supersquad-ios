import { Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { color } from "@/src/styles/_color";
import Header from "@/src/layout/Header";
import { WithLocalSvg } from "react-native-svg/css";
import Check from "@/assets/images/full_page_modal/Check.svg";
import PaybackBlock from "@/src/components/common/block/PaybackBlock";
import FullButton from "@/src/components/base/button/FullButton";

const ChallengeStatusModal = () => {
  const handleClaim = () => {};

  return (
    <StyledContainer>
      <StyledHeaderContainer>
        <Header type="back" />
      </StyledHeaderContainer>
      <StyledInner>
        <WithLocalSvg asset={Check} />
        <StyledTitle>You have completed</StyledTitle>
        <StyledValue>100%</StyledValue>
        <StyledTitle>of the challenge!</StyledTitle>
      </StyledInner>
      <StyledBlockContainer>
        <PaybackBlock />
      </StyledBlockContainer>
      <StyledFooterContainer>
        <FullButton title="Claim" handleOnClick={handleClaim} />
      </StyledFooterContainer>
    </StyledContainer>
  );
};

export default ChallengeStatusModal;

const StyledContainer = styled(View)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  padding-top: 80px;
  padding-bottom: 30px;
  background-color: ${color.white};
  position: relative;
`;

const StyledHeaderContainer = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledInner = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledTitle = styled(Text)`
  color: ${color.black};
  font-size: 17px;
  font-weight: 400;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StyledValue = styled(Text)`
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -1px;
  color: ${color.primary};
`;

const StyledBlockContainer = styled(View)`
  width: 100%;
  padding: 0 22px;
`;

const StyledFooterContainer = styled(View)`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;
