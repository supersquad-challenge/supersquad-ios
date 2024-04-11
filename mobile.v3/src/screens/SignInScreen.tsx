import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Header from "@/src/layout/Header";
import { color } from "@/src/styles/_color";
import BaseInput from "@/src/components/base/input/BaseInput";
import { WithLocalSvg } from "react-native-svg/css";
import Logo from "@/assets/imagelogo.svg";
import TextLogo from "@/assets/textlogo.svg";

import { ANDROID_AUTH_CLIENT_ID, WEB_AUTH_CLIENT_ID } from "@env";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import GoogleIcon from "@/assets/icons/Google.svg";

type Props = {
  route: any;
};

const SignInScreen = ({ route }: Props) => {
  const { auth } = route.params;
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailOnChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordOnChange = (text: string) => {
    setPassword(text);
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    responseType: "id_token",
    androidClientId: ANDROID_AUTH_CLIENT_ID,
    webClientId: WEB_AUTH_CLIENT_ID,
  });

  useEffect(() => {
    console.log("response", response);
    if (response?.type == "success" && auth) {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  useEffect(() => {
    if (auth) {
      const unsub = onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log(user);
        } else {
          console.log("None");
        }
      });
    }
  }, []);

  return (
    <StyledContainer>
      <StyledHeaderContainer>
        <Header type="back" />
      </StyledHeaderContainer>
      <StyledInner>
        <StyledSignInContainer>
          <StyledLogoContainer>
            <WithLocalSvg
              width={100}
              asset={Logo}
              style={{
                borderWidth: 2,
              }}
            />
            <WithLocalSvg
              width={160}
              asset={TextLogo}
              style={[
                {
                  transform: [{ translateY: -10 }],
                },
              ]}
            />
          </StyledLogoContainer>
          <StyledSignInBlock>
            <StyledInputBlock $marginTop={0}>
              <StyledInputLabel>email</StyledInputLabel>
              <BaseInput
                color={color.darkGray}
                fontSize={14}
                placeholder="Please enter your email"
                padding="5px 10px"
                border={`1px solid ${color.gray}`}
                borderRadius={10}
                value={email}
                handleOnChange={handleEmailOnChange}
                handleOnSubmit={() => {}}
                handleEndEditing={() => {}}
              />
            </StyledInputBlock>
            <StyledInputBlock $marginTop={25}>
              <StyledInputLabel>password</StyledInputLabel>
              <BaseInput
                color={color.darkGray}
                fontSize={14}
                placeholder="Please enter your password"
                padding="5px 10px"
                border={`1px solid ${color.gray}`}
                borderRadius={10}
                value={password}
                handleOnChange={handlePasswordOnChange}
                handleOnSubmit={() => {}}
                handleEndEditing={() => {}}
              />
            </StyledInputBlock>
          </StyledSignInBlock>
          <StyledIconContainer>
            <StyledIconButton onPress={() => promptAsync()}>
              <WithLocalSvg asset={GoogleIcon} />
            </StyledIconButton>
          </StyledIconContainer>
        </StyledSignInContainer>
      </StyledInner>
    </StyledContainer>
  );
};

export default SignInScreen;

const StyledContainer = styled(View)`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${color.black};
`;

const StyledHeaderContainer = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledInner = styled(View)`
  width: 100%;
  height: 100%;
  margin-top: 120px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${color.black};
`;

const StyledSignInTitle = styled(Text)`
  font-size: 26px;
  font-weight: 600;
`;

const StyledSignInBlock = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

type StyledInputBlockProps = {
  $marginTop: number;
};

const StyledInputBlock = styled(View)<StyledInputBlockProps>`
  position: relative;
  width: 100%;
  height: 45px;
  margin: ${({ $marginTop }) => `${$marginTop}px auto 15px auto`};
`;

const StyledInputLabel = styled(Text)`
  position: absolute;
  left: 0;
  top: 0;
  font-size: 14px;
  font-weight: 400;
  color: ${color.gray};
  transform: translate(3px, -20px);
`;

const StyledSignInContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 30px 50px 30px;
  border-radius: 30px;
  margin-top: 50px;
  border: 1px solid #00f0ff;
`;

const StyledLogoContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const StyledIconContainer = styled(View)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px auto;
`;

const StyledIconButton = styled(TouchableOpacity)`
  width: 40px;
  height: 40px;
  border: 1px solid #00f0ff;
  border-radius: ${`${40 / 2}px`};
  display: flex;
  align-items: center;
  justify-content: center;
`;
