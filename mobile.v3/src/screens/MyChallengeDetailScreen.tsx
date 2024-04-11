import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { color } from "@/src/styles/_color";
import Header from "@/src/layout/Header";
import { useQuery } from "react-query";
import { SCByUserChallengeIdResponse } from "@/src/types/data/Challenge";
import { fetchSingleChallengeByUserChallengeId } from "@/src/lib/api/querys/myChallenge/fetchSingleChallengeByUserChallengeId";
import { getCurrencyByPayment } from "@/src/utils/currencyByPayment";
import { PaymentMethodType } from "@/src/types/ui/Modal";
import BaseTag from "@/src/components/base/etc/tag/Tag";
import { DURATION } from "@/src/lib/etc/v2Constants";
import ParticipantsBlock from "@/src/components/common/block/ParticipantsBlock";
import LinearProgressbar from "@/src/components/base/etc/progressbar/LinearProgressbar";
import thousandFormat from "@/src/utils/numberFormatUtils";
import NewLine from "@/assets/images/left_bottom_perpendicular.svg";
import { WithLocalSvg } from "react-native-svg/css";
import Paragraph from "@/src/components/base/etc/paragraph/Paragraph";
import { convertIsoDateToReadable } from "@/src/utils/dataFormatUtils";
import FullButton from "@/src/components/base/button/FullButton";

type Props = {
  route: any;
};

const MyChallengeDetailScreen = ({ route }: Props) => {
  const { id } = route.params;

  const { data, isLoading, error } = useQuery<SCByUserChallengeIdResponse>({
    queryKey: [`myStatus-${id}`],
    queryFn: async () => {
      const res = await fetchSingleChallengeByUserChallengeId({
        userChallengeId: id,
      });
      const challenge = res.myStatus;

      console.log(challenge.thumbnailUrl);
      return challenge;
    },
    staleTime: 5000,
    cacheTime: 60 * 60 * 1000,
  });

  const currency = getCurrencyByPayment(
    data?.depositMethod as PaymentMethodType
  );

  const windowHeight = Dimensions.get("window").height;
  return (
    <StyledContainer>
      <Header type="back" />
      <StyledThumbnailContainer>
        <StyledThumbnail
          source={{
            uri: data?.thumbnailUrl,
          }}
        />
        <StyledTagContainer>
          <BaseTag
            bgColor={color.primary}
            color={color.highlight}
            title={"Everyday"}
          />
          <BaseTag
            bgColor={color.highlight}
            color={color.primary}
            title={DURATION}
          />
        </StyledTagContainer>
      </StyledThumbnailContainer>
      <StyledInner $margin={20}>
        <StyledName>{data?.name}</StyledName>
      </StyledInner>
      <StyledInner $margin={5}>
        <ParticipantsBlock participants={data?.participants} />
      </StyledInner>
      <StyledScrollContainer $size={windowHeight}>
        <StyledInner $margin={30}>
          <StyledTitle>My Status</StyledTitle>
        </StyledInner>
        <StyledInner $margin={0}>
          <LinearProgressbar
            min={0}
            max={100}
            value={data?.successRate}
            bgColor={color.lightGray}
            color={color.primary}
            isTooltip={true}
          />
        </StyledInner>
        <StyledInner $margin={0}>
          <StyledProgressbarContainer>
            <StyledTargetSuccess>Target Success</StyledTargetSuccess>
            <StyledTargetSuccessBold>100%</StyledTargetSuccessBold>
          </StyledProgressbarContainer>
        </StyledInner>
        <StyledInner $margin={20}>
          <StyledTitle>My Deposit</StyledTitle>
          <StyledDetail $fontSize={18}>
            {`${data?.deposit} ${currency}`}
          </StyledDetail>
        </StyledInner>
        <StyledInner $margin={25}>
          <StyledTitle>Total Crypto</StyledTitle>
          <StyledDetail $fontSize={24}>{`${thousandFormat(
            data?.totalDeposit! as number
          )} ${currency}`}</StyledDetail>
        </StyledInner>
        <StyledInner $margin={0}>
          <StyledPoolContainer>
            <WithLocalSvg asset={NewLine} />
            <StyledPoolTitle>Over 80% Pool</StyledPoolTitle>
            <StyledPoolDetail>
              {`${thousandFormat(
                data?.cryptoSuccessPool! as number
              )} ${currency}`}
            </StyledPoolDetail>
          </StyledPoolContainer>
        </StyledInner>
        <StyledInner $margin={0}>
          <StyledPoolContainer>
            <WithLocalSvg asset={NewLine} />
            <StyledPoolTitle>Under 80% Pool</StyledPoolTitle>
            <StyledPoolDetail>
              {`${thousandFormat(data?.cryptoFailPool!)} ${currency}`}
            </StyledPoolDetail>
          </StyledPoolContainer>
        </StyledInner>
        <StyledInner $margin={10}>
          <Paragraph
            title="Period"
            content={`${convertIsoDateToReadable(
              data?.challengeStartAt!
            )} - ${convertIsoDateToReadable(data?.challengeEndAt!)}`}
            detail={data?.frequency!}
          />
        </StyledInner>
        <StyledInner $margin={10}>
          <Paragraph
            title="How To"
            content={data?.howTo.split("*")[0]!}
            detail={data?.howTo.split("*")[1]!}
          />
        </StyledInner>
        <StyledInner $margin={10}>
          <Paragraph
            title="Why this challenge?"
            content=""
            detail={data?.description}
          />
        </StyledInner>
      </StyledScrollContainer>
      <FullButton title="Verify Mission" handleOnClick={() => {}} />
    </StyledContainer>
  );
};

export default MyChallengeDetailScreen;

const StyledContainer = styled(View)`
  width: 100%;
  height: auto;
  background-color: ${color.white};
  position: relative;
`;

type StyledInnerProps = {
  $margin: number;
};

const StyledInner = styled(View)<StyledInnerProps>`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ $margin }) => `${$margin}px`};
  padding: 0 22px 0px 22px;
`;

const StyledThumbnailContainer = styled(View)`
  width: 100%;
  height: 200px;
  position: relative;
`;

const StyledThumbnail = styled(Image)`
  width: 100%;
  height: 100%;
`;

const StyledTagContainer = styled(View)`
  position: absolute;
  display: flex;
  flex-direction: row;
  right: 22px;
  bottom: 20px;
  z-index: 2;
`;

const StyledTitle = styled(Text)`
  color: ${color.black};
  font-size: 18px;
  font-weight: 600;
`;

const StyledProgressbarContainer = styled(View)`
  width: 100%;
  height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const StyledTargetSuccess = styled(Text)`
  width: 100%;
  color: ${color.gray};
  text-align: right;
  margin-right: 5px;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: -0.3px;
`;

const StyledTargetSuccessBold = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  color: ${color.gray};
`;

const StyledName = styled(Text)`
  color: ${color.black};
  font-size: 22px;
  font-weight: 600;
  margin-top: 40px;
  margin-bottom: 20px;
`;

type StyledDetailProps = {
  $fontSize: number;
};

const StyledDetail = styled(Text)<StyledDetailProps>`
  color: ${color.primary};
  font-size: ${({ $fontSize }) => `${$fontSize}px`};
  font-weight: 600;
  letter-spacing: -0.36px;
`;

const StyledPoolContainer = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 10px auto;
`;

const StyledPoolTitle = styled(Text)`
  color: ${color.black};
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.28px;
  flex-grow: 1;
  margin-left: 10px;
`;

const StyledPoolDetail = styled(Text)`
  color: ${color.black};
  text-align: right;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
`;

type StyledScrollContainerProps = {
  $size: number;
};

const StyledScrollContainer = styled(ScrollView)<StyledScrollContainerProps>`
  width: 100%;
  margin-top: 20px;
  height: ${({ $size }) => `${$size / 3}px`};
  margin-bottom: 90px;
`;
