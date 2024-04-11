import { Text, View, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SCByChallengeIdResponse } from "@/src/types/data/Challenge";
import { useQuery } from "react-query";
import { fetchSingleChallenge } from "@/src/lib/api/querys/challenge/fetchSingleChallenge";
import styled from "styled-components/native";
import { color } from "@/src/styles/_color";
import Tag from "@/src/components/base/etc/tag/Tag";
import { DURATION } from "@/src/lib/etc/v2Constants";
import Paragraph from "@/src/components/base/etc/paragraph/Paragraph";
import ParticipantsBlock from "@/src/components/common/block/ParticipantsBlock";
import Header from "@/src/layout/Header";
import FullButton from "@/src/components/base/button/FullButton";
import {
  CLOSE_MODAL,
  IModalState,
  OPEN_MODAL,
  getModalState,
} from "@/src/redux/slice/modalSlice";
import { PaymentMethodType } from "@/src/types/ui/Modal";
import DepositChargeModal from "@/src/components/common/modal/DepositChargeModal";

type Props = {
  route: any;
};

const ChallengeDetail = ({ route }: Props) => {
  const dispatch = useDispatch();
  const { id, title, person } = route.params;
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodType>("crypto");
  const [buttonData, setButtonData] = useState<{
    title: string;
    modal: string | undefined;
  }>({
    title: "I am in!",
    modal: "DepositCharge",
  });
  const modalState: IModalState = useSelector(getModalState);

  const { data, error, isLoading } = useQuery<SCByChallengeIdResponse>({
    queryKey: [`singleChallenge-${id}`],
    queryFn: async () => {
      const res = await fetchSingleChallenge({ challengeId: id });
      const challenge = res.challengeInfo;
      return challenge;
    },
    staleTime: 5000,
    cacheTime: 60 * 60 * 1000,
  });
  useEffect(() => {
    setButtonData({
      title: "I am in!",
      modal: "DepositCharge",
    });
  }, []);
  return (
    <StyledContainer $padding={modalState.visibility}>
      <Header type="back" />
      <StyledThumbnailContainer>
        <StyledThumbnail
          source={{
            uri: route.params.thumbnail,
          }}
        />
        <StyledTagContainer>
          <Tag
            bgColor={color.primary}
            color={color.highlight}
            title={data?.frequency}
          />
          <Tag
            bgColor={color.highlight}
            color={color.primary}
            title={DURATION}
          />
        </StyledTagContainer>
      </StyledThumbnailContainer>
      <StyledInfoContainer>
        <StyledName>{title}</StyledName>
        <ParticipantsBlock participants={person} />
        <Paragraph
          title="Duration"
          content={DURATION}
          detail={data?.frequency!}
        />
        <Paragraph
          title="How To"
          content={data?.howTo.split("*")[0]!}
          detail={data?.howTo.split("*")[1]!}
        />
        <Paragraph
          title="Why this challenge?"
          content=""
          detail={data?.description!}
        />
      </StyledInfoContainer>
      {modalState.visibility || (
        <FullButton
          title={buttonData.title}
          handleOnClick={() => {
            dispatch(
              OPEN_MODAL({
                modal: buttonData.modal,
              })
            );
          }}
        />
      )}
      {modalState.modal === "DepositCharge" && modalState.visibility && (
        <DepositChargeModal
          show={true}
          paymentMethod={paymentMethod}
          challengeId={id}
        />
      )}
    </StyledContainer>
  );
};

export default ChallengeDetail;

type StyledContainerProps = {
  $padding: boolean;
};

const StyledContainer = styled(View)<StyledContainerProps>`
  width: 100%;
  height: 100%;
  padding-bottom: ${({ $padding }) => ($padding ? "0px" : "80px")};
  position: relative;
  background-color: ${color.white};
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

const StyledInfoContainer = styled(ScrollView)`
  width: 100%;
  height: auto;
  padding: 0 22px 15px 22px;
  box-sizing: border-box;
  overflow-y: scroll;
`;

const StyledName = styled(Text)`
  color: ${color.black};
  font-size: 22px;
  font-weight: 600;
  margin-top: 40px;
  margin-bottom: 20px;
`;
