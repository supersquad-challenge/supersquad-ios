import { Text, View } from "react-native";
import React from "react";
import { color } from "@/src/styles/_color";
import styled from "styled-components/native";
import Badge from "@/src/components/base/etc/badge/Badge";

type Props = {
  isLoggedIn: boolean;
  userName: string | undefined;
  point: number | undefined;
};

const GreetingBlock = ({ isLoggedIn, userName, point }: Props) => {
  return (
    <StyledBlockContainer>
      <StyledBlockInner $isLoggedIn={isLoggedIn}>
        <View>
          <StyledBlockTitle>
            Hi, {userName ? userName : "Challengers"}
          </StyledBlockTitle>
          <StyledBlockMessage>
            Hack your goals with SuperSquad!
          </StyledBlockMessage>
        </View>
        {isLoggedIn && <Badge />}
      </StyledBlockInner>
      {isLoggedIn && (
        <StyledPointContainer>
          <Badge />
          <View>
            <StyledPointTitle>point</StyledPointTitle>
            <StyledPointValue>{point ? point : 0}P</StyledPointValue>
          </View>
        </StyledPointContainer>
      )}
    </StyledBlockContainer>
  );
};

export default GreetingBlock;

const StyledBlockContainer = styled(View)`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: 22px;
`;

type StyledBlockInnerProps = {
  $isLoggedIn: boolean;
};

const StyledBlockInner = styled(View)<StyledBlockInnerProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${({ $isLoggedIn }) => ($isLoggedIn ? "20px" : "40px")};
`;

const StyledBlockTitle = styled(Text)`
  color: ${color.white};
  font-size: 26px;
  line-height: 26px;
  font-weight: 600;
  letter-spacing: -0.52px;
`;

const StyledBlockMessage = styled(Text)`
  color: ${color.white};
  font-size: 16px;
  line-height: 16px;
  font-weight: 400;
  letter-spacing: -0.52px;
  margin-top: 10px;
`;

const StyledPointContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const StyledPointTitle = styled(Text)`
  color: ${color.white};
  font-size: 18px;
  font-weight: 500;
`;

const StyledPointValue = styled(Text)`
  color: ${color.highlight};
  font-size: 28px;
  font-weight: 800;
  margin-top: -3px;
`;
