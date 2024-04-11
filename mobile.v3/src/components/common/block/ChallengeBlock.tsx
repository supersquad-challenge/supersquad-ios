import { Image, Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { color } from "@/src/styles/_color";
import { NavigationProp } from "@react-navigation/native";
import BaseBlock from "@/src/components/base/block/BaseBlock";
import {
  addDaysToDate,
  convertIsoDateToReadable,
} from "@/src/utils/dataFormatUtils";
import { DURATION_DAYS } from "@/src/lib/etc/v2Constants";
import { WithLocalSvg } from "react-native-svg/css";
import PersonIcon from "@/assets/images/ic_participant.svg";

type Props = {
  thumbnailUrl: string;
  title: string;
  person: number;
  handleOnClick: () => void;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
};

const ChallengeBlock = ({
  thumbnailUrl,
  title,
  person,
  handleOnClick,
  navigation,
}: Props) => {
  const today = new Date();

  return (
    <StyledChallengeContainer>
      <BaseBlock
        bgColor={color.white}
        padding="0px"
        radius={10}
        border="1px solid #DDD"
        handleOnClick={handleOnClick}
      >
        <View>
          <StyledThumbnailContainer>
            <Image
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#EEEEEE",
              }}
              source={{
                uri: thumbnailUrl,
              }}
            />
          </StyledThumbnailContainer>
          <StyledInfoContainer>
            <View>
              <Title>{title}</Title>
              <Duration>
                {convertIsoDateToReadable(today.toString())} -{" "}
                {convertIsoDateToReadable(
                  addDaysToDate(today, DURATION_DAYS).toString()
                )}
              </Duration>
            </View>
            <StyledPersonContainer>
              <WithLocalSvg asset={PersonIcon} />
              <Participants>{person}</Participants>
            </StyledPersonContainer>
          </StyledInfoContainer>
        </View>
      </BaseBlock>
    </StyledChallengeContainer>
  );
};

export default ChallengeBlock;

const StyledChallengeContainer = styled(View)`
  width: 50%;
  height: 222px;
  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 10px;
`;

const StyledThumbnailContainer = styled(View)`
  width: 100%;
  height: 100px;
  border-radius: 10px 10px 0px 0px;
  position: relative;
  overflow: hidden;
`;

const StyledInfoContainer = styled(View)`
  width: 100%;
  height: 122px;
  padding: 14px 0 15px 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled(Text)`
  max-width: 110px;
  color: ${color.black};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.32px;
`;

const Duration = styled(Text)`
  width: auto;
  margin-top: 5px;
  color: ${color.gray};
  font-size: 14px;
  font-weight: 400;
`;

const StyledPersonContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Participants = styled(Text)`
  color: ${color.black};
  font-size: 14px;
  font-weight: 600;
`;
