import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { color } from "@/src/styles/_color";
import { WithLocalSvg } from "react-native-svg/css";
import Profile from "@/assets/images/profile-circle.svg";

type Props = {
  participants: number | undefined;
};

const ParticipantsBlock = ({ participants }: Props) => {
  return (
    <StyledContainer>
      <StyledCircleContainer>
        <StyledProfileContainer $size={33} $isFirst={true}>
          <WithLocalSvg width={33} height={33} asset={Profile as never} />
        </StyledProfileContainer>
        <StyledProfileContainer $size={33} $isFirst={false}>
          <WithLocalSvg width={33} height={33} asset={Profile as never} />
        </StyledProfileContainer>
        <StyledPersonCountContainer $size={33}>
          <StyledPersonCount>
            +{participants ? participants - 2 : 0}
          </StyledPersonCount>
        </StyledPersonCountContainer>
      </StyledCircleContainer>
      <StyledMessage>
        <StyledBoldMessage>{`${participants} people `}</StyledBoldMessage>
        participating!
      </StyledMessage>
    </StyledContainer>
  );
};

export default ParticipantsBlock;

const StyledContainer = styled(View)`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 19px;
  box-sizing: border-box;
  background-color: rgba(82, 101, 251, 0.1);
  border-radius: 10px;
`;

const StyledCircleContainer = styled(View)`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
`;

type StyledSizeProps = {
  $size: number;
};

type StyledProfileContainerProps = StyledSizeProps & {
  $isFirst: boolean;
};

const StyledProfileContainer = styled(View)<StyledProfileContainerProps>`
  width: 33px;
  height: 33px;
  border-radius: ${({ $size }) => `${$size / 2}px`};
  overflow: hidden;
  padding: 1px;
  background-color: ${color.white};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-left: ${({ $isFirst }) => ($isFirst ? "0px" : "-10px")};
`;

const StyledPersonCountContainer = styled(View)<StyledSizeProps>`
  width: 33px;
  height: 33px;
  border-radius: ${({ $size }) => `${$size / 2}px`};
  background-color: #d9d9d9;
  border: 1px solid ${color.white};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  box-sizing: border-box;
  margin-left: -10px;
`;

const StyledPersonCount = styled(Text)`
  color: ${color.black};
  font-size: 10px;
  font-weight: 400;
  text-align: center;
`;

const StyledMessage = styled(Text)`
  color: ${color.primary};
  font-size: 16px;
  font-weight: 400;
`;

const StyledBoldMessage = styled(Text)`
  font-weight: 700;
`;
