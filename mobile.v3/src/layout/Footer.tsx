import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { color } from "@/src/styles/_color";
import { useNavigation, useRoute } from "@react-navigation/native";
import HomeIcon from "@/src/components/icons/HomeIcon";
import ExploreIcon from "@/src/components/icons/ExploreIcon";
import MyChallengeIcon from "@/src/components/icons/MyChallengeIcon";
import ProfileIcon from "@/src/components/icons/ProfileIcon";

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <StyledFooterContainer>
      <StyledFooterInner>
        <StyledButton
          onPress={() => {
            navigation.navigate("HomeScreen" as never);
          }}
        >
          <HomeIcon type={route.name === "HomeScreen"} />
        </StyledButton>
        <StyledButton
          onPress={() => {
            navigation.navigate("ExploreScreen" as never);
          }}
        >
          <ExploreIcon type={route.name === "ExploreScreen"} />
        </StyledButton>
        <StyledButton
          onPress={() => {
            navigation.navigate("MyChallengeScreen" as never);
          }}
        >
          <MyChallengeIcon type={route.name === "MyChallengeScreen"} />
        </StyledButton>
        <StyledButton
          onPress={() => {
            navigation.navigate("ProfileScreen" as never);
          }}
        >
          <ProfileIcon type={route.name === "ProfileScreen"} />
        </StyledButton>
      </StyledFooterInner>
    </StyledFooterContainer>
  );
};

export default Footer;

const StyledFooterContainer = styled(View)`
  width: 100%;
  height: 80px;
  padding-left: 23px;
  padding-right: 23px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 40px;
  left: 0;
  background-color: transparent;
  z-index: 99;
`;

const StyledFooterInner = styled(View)`
  height: 100%;
  width: 100%;
  background-color: ${color.black};
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledButton = styled(TouchableOpacity)`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
