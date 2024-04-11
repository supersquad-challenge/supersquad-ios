import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { color } from "@/src/styles/_color";
import styled from "styled-components/native";
import { WithLocalSvg } from "react-native-svg/css";
import NewLine from "@/assets/images/left_bottom_perpendicular.svg";

const PaybackBlock = () => {
  return (
    <StyledContainer>
      <StyledTitleContainer>
        <StyledPaybackLabel>Total Payback</StyledPaybackLabel>
        <StyledPaybackValue>123 Matic</StyledPaybackValue>
      </StyledTitleContainer>
      <StyledPoolContainer $marginTop={0}>
        <WithLocalSvg asset={NewLine} />
        <StyledPoolTitle>My Deposit</StyledPoolTitle>
        <StyledPoolContent>300 MATIC</StyledPoolContent>
      </StyledPoolContainer>
      <StyledPoolContainer $marginTop={10}>
        <WithLocalSvg asset={NewLine} />
        <StyledPoolTitle>Profit / Loss</StyledPoolTitle>
        <StyledPoolContent>20 MATIC</StyledPoolContent>
      </StyledPoolContainer>
    </StyledContainer>
  );
};

export default PaybackBlock;

const StyledContainer = styled(View)`
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 19px;
  background-color: rgba(82, 101, 251, 0.1);
  border-radius: 10px;
`;

const StyledTitleContainer = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 22px auto 20px auto;
`;

const StyledPaybackLabel = styled(Text)`
  font-size: 17px;
  font-weight: 600;
  color: ${color.black};
`;

const StyledPaybackValue = styled(Text)`
  font-size: 22px;
  font-weight: 600;
  color: ${color.primary};
`;

type StyledPoolContentProps = {
  $marginTop: number;
};

const StyledPoolContainer = styled(View)<StyledPoolContentProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: ${({ $marginTop }) => `${$marginTop}px`};
`;

const StyledPoolTitle = styled(Text)`
  color: ${color.black};
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.28px;
  flex-grow: 1;
  margin-left: 10px;
`;

const StyledPoolContent = styled(Text)`
  color: ${color.black};
  text-align: right;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.28px;
`;
