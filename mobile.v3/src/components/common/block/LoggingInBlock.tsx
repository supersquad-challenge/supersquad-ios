import { StyleSheet, Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import BaseButton from "@/src/components/base/button/BaseButton";
import { color } from "@/src/styles/_color";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
};

const LoggingInBlock = ({ navigation }: Props) => {
  const handleLogin = async () => {
    const userExist = await AsyncStorage.getItem("@user");
    if (userExist) {
      console.log(userExist);
    } else {
      navigation.navigate("SignInScreen" as never);
    }
  };
  return (
    <StyledContainer>
      <StyledTitle>Join SuperSquad now!</StyledTitle>
      <StyledContent>You can participate in various challenges</StyledContent>
      <StyledButtonContainer>
        <BaseButton
          title="Login"
          handleOnPress={handleLogin}
          color={color.white}
          fontSize={18}
          fontWeight={500}
          backgroundColor={color.primary}
          padding="0px 100px"
          borderRadius={25}
        />
      </StyledButtonContainer>
    </StyledContainer>
  );
};

export default LoggingInBlock;

const StyledContainer = styled(View)`
  width: 100%;
  height: 193px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
`;

const StyledTitle = styled(Text)`
  font-size: 18px;
  font-weight: 600;
`;

const StyledContent = styled(Text)`
  font-size: 15px;
  font-weight: 400;
  margin-top: 10px;
  letter-spacing: -0.5px;
`;

const StyledButtonContainer = styled(View)`
  padding: 0 20px;
  height: 50px;
  margin-top: 20px;
`;
