import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { PaymentMethodType } from "@/src/types/ui/Modal";
import { useDispatch } from "react-redux";
import { getCurrencyByPayment } from "@/src/utils/currencyByPayment";
import BaseModal from "@/src/components/base/modal/BaseModal";
import styled from "styled-components/native";
import { color } from "@/src/styles/_color";
import BaseSlider from "@/src/components/base/slider/BaseSlider";
import FullButton from "@/src/components/base/button/FullButton";
import setChallenge from "@/src/lib/api/axios/challenge/setChallenge";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";

type Props = {
  show: boolean;
  paymentMethod: PaymentMethodType;
  challengeId: string;
};

const DepositChargeModal = ({ paymentMethod, challengeId, show }: Props) => {
  const [deposit, setDeposit] = useState<number>(10);
  const dispatch = useDispatch();
  const currency = getCurrencyByPayment(paymentMethod);
  const navigation = useNavigation();

  const handleSliderChange = (_deposit: string) => {
    if (_deposit.length === 0 || parseInt(_deposit) < 0) setDeposit(0);
    else if (parseInt(_deposit) > 300) setDeposit(300);
    else setDeposit(parseInt(_deposit));
  };

  const handleRegisterChallenge = async () => {
    const res = await setChallenge({
      userId: "655421fd6d6246277ec597d4",
      challengeId: challengeId,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    if (res?.status === 200) {
      navigation.dispatch(
        CommonActions.navigate({
          name: "JoinChallengeModal",
          params: {
            id: res.data.userChallengeId,
          },
        })
      );
    }
  };

  return (
    <BaseModal title="Win your goal" deletePath={undefined}>
      <StyledDepositChargeModalContainer>
        <ChallengeInfoPair
          title="Period"
          content="Sep 11st- Oct 11st"
          contentColor={color.primary}
          margin="-10px 0px 0px 0px"
        />
        <ChallengeInfoPair
          title="Frequency"
          content="Everyday"
          contentColor={color.black}
          margin="15px 0px 0px 0px"
        />
        <ChallengeInfoPair
          title="Deposit"
          content=""
          contentColor={color.black}
          margin="15px 0px 0px 0px"
        />
        <StyledSliderContainer>
          <BaseSlider
            min={10}
            max={300}
            value={deposit}
            handleOnChange={handleSliderChange}
            bgColor={color.lightGray}
            color={color.primary}
          />
          <StyledSliderCountInner>
            <StyledSliderValue>10</StyledSliderValue>
            <StyledSliderValue>300</StyledSliderValue>
          </StyledSliderCountInner>
        </StyledSliderContainer>
        <StyledDepositContainer>
          <StyledDepositInner>
            <StyledDeposit>{deposit}</StyledDeposit>
          </StyledDepositInner>
          <StyledCurrenryInner
            style={{
              borderLeftWidth: 2,
              borderColor: "#DDD",
            }}
          >
            <StyledCurrency>{currency as string}</StyledCurrency>
          </StyledCurrenryInner>
        </StyledDepositContainer>
      </StyledDepositChargeModalContainer>
      <FullButton
        title="Charge Deposit"
        handleOnClick={() => handleRegisterChallenge()}
      />
    </BaseModal>
  );
};

export default DepositChargeModal;

const StyledDepositChargeModalContainer = styled(View)`
  margin-top: 50px;
  padding: 0 22px 0 22px;
`;

const StyledSliderContainer = styled(View)`
  width: 100%;
  height: auto;
  margin-top: 25px;
`;

const StyledSliderCountInner = styled(View)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const StyledSliderValue = styled(Text)`
  color: ${color.gray};
  font-size: 15px;
  font-weight: 400;
`;

const StyledDepositContainer = styled(View)`
  width: 100%;
  height: 60px;
  border-radius: 20px;
  border: 2px solid #ddd;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const StyledDepositInner = styled(View)`
  width: 70%;
  height: 100%;
  padding-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const StyledDeposit = styled(Text)`
  color: ${color.black};
  font-size: 16px;
  font-weight: 600;
`;

const StyledCurrenryInner = styled(View)`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledCurrency = styled(Text)`
  color: ${color.black};
  font-size: 16px;
  font-weight: 400;
`;

type ChallengeInfoPairProps = {
  title: string;
  content: string;
  contentColor: string;
  margin: string;
};

const ChallengeInfoPair = ({
  title,
  content,
  contentColor,
  margin,
}: ChallengeInfoPairProps) => {
  return (
    <StyledContainer $margin={margin}>
      <StyledTitle>{title}</StyledTitle>
      <StyledContent $color={contentColor}>{content}</StyledContent>
    </StyledContainer>
  );
};

type StyledContainerProps = {
  $margin: string;
};

const StyledContainer = styled(View)<StyledContainerProps>`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  margin: ${({ $margin }) => $margin};
`;

const StyledTitle = styled(Text)`
  color: ${color.black};
  font-size: 18px;
  font-weight: 400;
  width: 112px;
`;

type StyledContentProps = {
  $color: string;
};

const StyledContent = styled(Text)<StyledContentProps>`
  color: ${({ $color }) => $color};
  font-size: 18px;
  font-weight: 600;
`;
