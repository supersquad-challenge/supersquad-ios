import { ImageBackground, ScrollView, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Footer from "@/src/layout/Footer";
import { color } from "@/src/styles/_color";
import { styled } from "styled-components/native";
import Header from "@/src/layout/Header";
import GreetingBlock from "@/src/components/common/block/GreetingBlock";
import { useQuery } from "react-query";
import { fetchAllChallengesByUserId } from "@/src/lib/api/querys/myChallenge/fetchAllChallengesByUserId";
import { useNavigation } from "@react-navigation/native";
import MychallengeBlock from "@/src/components/common/block/MyChallengeBlock";
import LoggingInBlock from "@/src/components/common/block/LoggingInBlock";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "@/src/lib/api/axios/auth/login";

const HomeScreen = () => {
  const contentRef = useRef(null);
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const navigation = useNavigation();

  const { data, error, isLoading } = useQuery(
    ["challenge"],
    async () => {
      const res = await fetchAllChallengesByUserId({
        userId: "655ebbf56ad23b5c71d5ede2",
      });
      return res;
    },
    {
      staleTime: 5000,
      cacheTime: 60 * 60 * 1000,
    }
  );

  useEffect(() => {
    handleLogin();
  }, []);

  const handleLogin = async () => {
    const userId = await AsyncStorage.getItem("@user");
    if (!userId) {
      navigation.navigate("SignInScreen" as never);
    } else {
      const _userId = JSON.parse(userId);
      const user = await login(_userId);
      console.log(user);
    }
  };

  const handleScroll = useCallback(() => {
    console.log(contentRef.current);
  }, []);
  return (
    <StyledContainer $isLoggedIn={false}>
      <Header type="basic" />
      <StyledInner>
        <GreetingBlock
          isLoggedIn={false}
          userName={undefined}
          point={undefined}
        />
        <LoggingInBlock navigation={navigation} />
      </StyledInner>
      <StyledImageContainer>
        <StyledBackground
          source={require("@/assets/images/Saly-36.png")}
          resizeMode="cover"
        ></StyledBackground>
      </StyledImageContainer>
      <StyledScrollView onScroll={handleScroll}>
        <ChallengeContainer ref={contentRef} $isScrolled={isScroll}>
          <ChallengeInner>
            <ChallengeHeader>Today challenges</ChallengeHeader>
            {data?.userChallengeInfos &&
              data.userChallengeInfos.length !== 0 && (
                <MychallengeBlock
                  progress={data.userChallengeInfos[0].successRate}
                  thumbnail={data.userChallengeInfos[0].thumbnailUrl}
                  category={data.userChallengeInfos[0].category}
                  name={data.userChallengeInfos[0].name}
                  startAt={data.userChallengeInfos[0].challengeStartAt}
                  endAt={data.userChallengeInfos[0].challengeEndAt}
                  status={data.userChallengeInfos[0].status}
                  isDup={false}
                  border="None"
                  margin={"20px auto 0 auto"}
                  handleOnClick={() => {}}
                  navigation={navigation}
                />
              )}
          </ChallengeInner>
        </ChallengeContainer>
      </StyledScrollView>
      <Footer />
    </StyledContainer>
  );
};

export default HomeScreen;

type StyledContainerProps = {
  $isLoggedIn: boolean;
};

const StyledContainer = styled(View)<StyledContainerProps>`
  width: 100%;
  height: 100%;
  padding: 0;
  background-color: ${color.primary};
  position: relative;
`;

const StyledInner = styled(View)`
  width: 100%;
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledScrollView = styled(ScrollView)`
  width: 100%;
  height: 100%;
  z-index: 99;
`;

const StyledImageContainer = styled(View)`
  position: absolute;
  top: 110px;
  right: 0;
  z-index: -1;
`;

const StyledBackground = styled(ImageBackground)`
  width: 271px;
  height: 340px;
`;

type ChallengeContainerProps = {
  $isScrolled: boolean;
};

const ChallengeContainer = styled(View)<ChallengeContainerProps>`
  width: 100%;
  height: 1000px;
  box-sizing: border-box;
  overflow: hidden;
  margin-top: ${({ $isScrolled }) => ($isScrolled ? "114px" : "214px")};
  transition: margin-top 0.3s ease-in-out;
  border-radius: 22px 22px 0px 0px;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
`;

const ChallengeInner = styled(View)`
  width: 100%;
  padding: 40px 22px 115px 22px;
  box-sizing: border-box;
  overflow: auto;
`;

const ChallengeHeader = styled(Text)`
  color: ${color.black};
  font-size: 18px;
  font-weight: 600;
`;
