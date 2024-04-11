import { View, Image } from "react-native";
import React from "react";
import styled from "styled-components/native";
import Footer from "@/src/layout/Footer";
import Header from "@/src/layout/Header";
import { color } from "@/src/styles/_color";
import { WithLocalSvg } from "react-native-svg/css";
import ProfileImage from "@/assets/images/profile-circle.svg";

const Profile = () => {
  return (
    <StyledContainer>
      <StyledHeaderContainer>
        <Header type="basic" />
      </StyledHeaderContainer>
      <StyledAccountOverviewContainer>
        <StyledProfileImageContainer>
          {true ? (
            <WithLocalSvg
              style={{ width: "100%", height: "100%" }}
              asset={ProfileImage}
            />
          ) : (
            <Image source={{ uri: "" }} />
          )}
        </StyledProfileImageContainer>
      </StyledAccountOverviewContainer>
      <Footer />
    </StyledContainer>
  );
};

export default Profile;

const StyledContainer = styled(View)`
  width: 100%;
  height: 100%;
  padding: 0;
  background-color: ${color.white};
  position: relative;
`;

const StyledHeaderContainer = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
`;

const StyledAccountOverviewContainer = styled(View)`
  width: 100%;
  padding: 130px 22px 66px 22px;
  box-sizing: border-box;
  background-color: ${color.primary};
  display: flex;
  flex-direction: row;
`;

const StyledProfileImageContainer = styled(View)`
  width: 100px;
  height: 100px;
  border-radius: ${`${100 / 2}px`};
  overflow: hidden;
  padding: 1px;
  display: flex;
  background-color: #000;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
`;
