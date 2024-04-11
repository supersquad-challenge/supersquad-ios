import { StyleSheet, Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { color } from "@/src/styles/_color";
import Header from "@/src/layout/Header";
import { WithLocalSvg } from "react-native-svg/css";
import SubmitPhoto from "@/assets/images/modal/SubmitPhoto.svg";
import BaseButton from "@/src/components/base/button/BaseButton";

const SubmitPhotoModal = () => {
  return (
    <StyledContainer>
      <StyledHeaderContainer>
        <Header type="back" />
      </StyledHeaderContainer>
      <WithLocalSvg asset={SubmitPhoto} />
      <StyledTitle>Snap your scale</StyledTitle>
      <StyledContent>Take a picture of your scale</StyledContent>
      <StyledContent>everyday to prove your weight.</StyledContent>
      <StyledContent>Remind to have your both feet shown!</StyledContent>
      <StyledButtonContainer>
        <BaseButton
          title="Complete Mission"
          color={color.white}
          backgroundColor={color.primary}
          borderRadius={40}
          padding="10px 80px"
          fontWeight={500}
          fontSize={16}
          handleOnPress={() => {}}
        />
      </StyledButtonContainer>
    </StyledContainer>
  );
};

export default SubmitPhotoModal;

const StyledContainer = styled(View)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${color.white};
  position: relative;
`;

const StyledHeaderContainer = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledTitle = styled(Text)`
  color: ${color.black};
  font-size: 25px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
`;

const StyledContent = styled(Text)`
  color: ${color.black};
  font-size: 20px;
  font-weight: 300;
  letter-spacing: -1px;
  text-align: center;
`;

const StyledButtonContainer = styled(View)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;
