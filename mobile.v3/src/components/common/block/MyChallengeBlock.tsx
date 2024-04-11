import { Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { color } from "@/src/styles/_color";
import BaseBlock from "@/src/components/base/block/BaseBlock";
import { convertIsoDateToReadable } from "@/src/utils/dataFormatUtils";
import { getChallengeType } from "@/src/utils/challengeTypeUtils";
import CircularProgressbar from "@/src/components/base/etc/progressbar/CircularProgressbar";
import { NavigationProp } from "@react-navigation/native";
import BaseButton from "@/src/components/base/button/BaseButton";

type Props = {
  margin: string;
  border: string;
  progress: number;
  thumbnail: string;
  category: string;
  name: string;
  startAt: string;
  endAt: string;
  status: string;
  isDup: boolean;
  handleOnClick: () => void;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
};

const MychallengeBlock = ({
  progress,
  thumbnail,
  category,
  name,
  startAt,
  endAt,
  status,
  isDup,
  border,
  margin,
  handleOnClick,
}: Props) => {
  const challengeProgress = getChallengeType(status, isDup);

  return (
    <StyledContainer $margin={margin}>
      <BaseBlock
        bgColor={color.white}
        radius={20}
        padding="22px"
        handleOnClick={handleOnClick}
        border={border}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <CircularProgressbar progress={progress} thumbnail={thumbnail} />
          <StyledInner>
            <StyledCategory>{category}</StyledCategory>
            <StyledName>{name}</StyledName>
            <StyledDuration>
              {convertIsoDateToReadable(startAt)} -{" "}
              {convertIsoDateToReadable(endAt)}
            </StyledDuration>
            <StyledButtonContainer $margin={"15px 0px 0px 0px"}>
              <BaseButton
                title={challengeProgress.title}
                color={color.white}
                backgroundColor={
                  challengeProgress.isButtonPrimary ? color.primary : color.gray
                }
                borderRadius={21}
                fontSize={14}
                padding="0px 11px 0px 15px"
                fontWeight={500}
                handleOnPress={handleOnClick}
              />
            </StyledButtonContainer>
          </StyledInner>
        </View>
      </BaseBlock>
    </StyledContainer>
  );
};

export default MychallengeBlock;

type StyledContainerProps = {
  $margin: string;
};

const StyledContainer = styled(View)<StyledContainerProps>`
  width: 100%;
  height: 200px;
  margin: ${({ $margin }) => $margin};
`;

const StyledInner = styled(View)`
  margin-left: 25px;
  width: auto;
  height: auto;
`;

const StyledCategory = styled(Text)`
  margin-bottom: 3px;
  color: ${color.gray};
  font-size: 13px;
  font-weight: 500;
`;

const StyledName = styled(Text)`
  color: ${color.black};
  font-size: 18px;
  font-weight: 600;
  max-width: 185px;
  line-height: 23.4px;
  letter-spacing: -0.36px;
`;

const StyledDuration = styled(Text)`
  color: ${color.black};
  font-size: 14px;
  font-weight: 500;
  margin-top: 5px;
`;

type StyledButtonContainerProps = {
  $margin: string;
};

const StyledButtonContainer = styled(View)<StyledButtonContainerProps>`
  width: fit-content;
  height: 30px;
  margin: ${({ $margin }) => $margin};
`;
