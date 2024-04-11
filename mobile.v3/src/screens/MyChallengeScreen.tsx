import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import { color } from "@/src/styles/_color";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useQuery } from "react-query";
import { fetchAllChallengesByUserId } from "../lib/api/querys/myChallenge/fetchAllChallengesByUserId";
import { filterChallengeByStatus } from "../utils/filterChallengeUtils";
import MychallengeBlock from "../components/common/block/MyChallengeBlock";
import Header from "@/src/layout/Header";
import Footer from "@/src/layout/Footer";
import EmptyChallengeBlock from "@/src/components/common/block/EmptyChallengeBlock";

const MyChallengeScreen = () => {
  const [pageState, setPageState] = useState<"ongoing" | "complete">("ongoing");
  const navigation = useNavigation();

  const { data, error, isLoading } = useQuery(
    [`user-challenges`],
    async () => {
      const res = await fetchAllChallengesByUserId({
        userId: "65648d0d4dcaa0dd4e1206c8",
      });
      console.log(res);
      return res;
    },
    {
      staleTime: 5000,
      cacheTime: 60 * 60 * 1000,
    }
  );

  const _challenges = filterChallengeByStatus(
    data?.userChallengeInfos,
    pageState
  );
  return (
    <StyledContainer>
      <StyledHeaderContainer>
        <Header type="basic" />
      </StyledHeaderContainer>
      <StyledStatusContainer>
        <StyledPageTitle>My Challenge</StyledPageTitle>
        <StyledStatusInner>
          <TouchableOpacity onPress={() => setPageState("ongoing")}>
            <StyledStatusItem $isClicked={pageState === "ongoing"}>
              Ongoing
            </StyledStatusItem>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 20 }}
            onPress={() => setPageState("complete")}
          >
            <StyledStatusItem $isClicked={pageState === "complete"}>
              Complete
            </StyledStatusItem>
          </TouchableOpacity>
        </StyledStatusInner>
      </StyledStatusContainer>
      <StyledChallengeContainer>
        <StyledChallengeCount>
          {_challenges && `Total `}
          <StyledChallengeCountBold>
            {_challenges && _challenges.length}
          </StyledChallengeCountBold>
        </StyledChallengeCount>
        {_challenges && _challenges.length !== 0 && (
          <FlatList
            style={{
              marginBottom: 320,
            }}
            data={_challenges}
            renderItem={({ item }) => (
              <MychallengeBlock
                key={item.userChallengeId}
                progress={item.successRate}
                thumbnail={item.thumbnailUrl}
                name={item.name}
                startAt={item.challengeStartAt}
                endAt={item.challengeEndAt}
                status={item.status}
                category={item.category}
                isDup={false}
                border="1px solid #dddddd"
                margin="0 0 15px 0"
                handleOnClick={() => {
                  navigation.dispatch(
                    CommonActions.navigate({
                      name: "MyChallengeDetailScreen",
                      params: {
                        id: item.userChallengeId,
                        challengeId: item.challengeId,
                        category: item.category,
                        title: item.name,
                        thumbnail: item.thumbnailUrl,
                        startAt: item.challengeStartAt,
                        endAt: item.challengeEndAt,
                      },
                    })
                  );
                }}
                navigation={navigation}
              />
            )}
            keyExtractor={(item) => item.userChallengeId}
            numColumns={1}
          />
        )}
        {!_challenges || (_challenges.length === 0 && <EmptyChallengeBlock />)}
      </StyledChallengeContainer>
      <Footer />
    </StyledContainer>
  );
};

export default MyChallengeScreen;

const StyledContainer = styled(View)`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
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

const StyledStatusContainer = styled(View)`
  width: 100%;
  padding: 130px 22px 20px 22px;
  box-sizing: border-box;
  background-color: ${color.primary};
  z-index: 3;
`;

const StyledPageTitle = styled(Text)`
  color: ${color.white};
  font-size: 24px;
  font-weight: 600;
  line-height: 24px;
`;

const StyledStatusInner = styled(View)`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;

type StyledStatusItemProps = {
  $isClicked: boolean;
};

const StyledStatusItem = styled(Text)<StyledStatusItemProps>`
  color: ${({ $isClicked }) =>
    $isClicked ? "#FFF570" : "rgba(255, 255, 255, 0.6)"};
  font-size: 16px;
  font-weight: 600;
`;

const StyledChallengeContainer = styled(View)`
  width: 100%;
  height: auto;
  padding: 30px 22px 15px 22px;
  box-sizing: border-box;
  overflow: scroll;
  background-color: ${color.white};
`;

const StyledChallengeCount = styled(Text)`
  display: flex;
  color: ${color.black};
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.28px;
  margin-bottom: 20px;
`;

const StyledChallengeCountBold = styled(Text)`
  font-weight: 600;
`;
