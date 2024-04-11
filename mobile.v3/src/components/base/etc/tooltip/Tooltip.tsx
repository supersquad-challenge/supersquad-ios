import { StyleSheet, Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { WithLocalSvg } from "react-native-svg/css";
import TooltipIcon from "@/assets/images/tooltip.svg";
import { color } from "@/src/styles/_color";

type Props = {
  rate: number;
};

const BaseTooltip = ({ rate }: Props) => {
  return (
    <StyledTooltipContainer $rate={rate}>
      <StyledTooltipBody>
        <WithLocalSvg asset={TooltipIcon} />
        <StyledTooltipContentContainer>
          <StyledTooltipContent>{rate}%</StyledTooltipContent>
        </StyledTooltipContentContainer>
      </StyledTooltipBody>
    </StyledTooltipContainer>
  );
};

export default BaseTooltip;

type StyledTooltipContainerProps = {
  $rate: number;
};

const StyledTooltipContainer = styled(View)<StyledTooltipContainerProps>`
  width: 44px;
  height: 31px;
  margin-bottom: 5px;
  position: absolute;
  bottom: 100%;
  left: ${({ $rate }) => `${$rate}%`};
  transform: ${`translate(-${50 / 2}px, ${30 / 2}px)`};
`;

const StyledTooltipBody = styled(View)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StyledTooltipContentContainer = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 5px;
`;

const StyledTooltipContent = styled(Text)`
  color: ${color.primary};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.28px;
`;
