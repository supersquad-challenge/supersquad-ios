import { FlatList, Text, View } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import { color } from "@/src/styles/_color";
import { useQuery } from "react-query";
import { filterChallengeByCategory } from "../utils/filterChallengeUtils";
import { fetchAllChallenges } from "@/src/lib/api/querys/challenge/fetchAllChallenges";
import Header from "@/src/layout/Header";
import Category from "@/src/components/base/etc/category/Cetegory";
import {
  DietIcon,
  FitnessIcon,
  HabitIcon,
  MentalIcon,
} from "@/src/components/icons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Footer from "@/src/layout/Footer";
import ChallengeBlock from "@/src/components/common/block/ChallengeBlock";

const ExploreScreen = () => {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const navigation = useNavigation();

  const { data, error, isLoading } = useQuery(
    [`challenge-${category}`],
    async () => {
      const res = await fetchAllChallenges();
      const challenges = filterChallengeByCategory(res.challengeInfo, category);
      return challenges;
    },
    {
      staleTime: 5000,
      cacheTime: 60 * 60 * 1000,
    }
  );

  const handleCategory = (_category: string) => {
    if (category === undefined || category !== _category) {
      setCategory(_category);
    } else {
      setCategory(undefined);
    }
  };
  return (
    <StyledContainer>
      <StyledHeaderContainer>
        <Header type="basic" />
      </StyledHeaderContainer>
      <StyledCategoryContainer>
        <StyledCategoryTitle>Categories</StyledCategoryTitle>
        <StyledCategoryInner>
          <Category
            title="Diet"
            isSelected={category === "Diet"}
            handleOnClick={handleCategory}
          >
            <DietIcon />
          </Category>
          <Category
            title="Fitness"
            isSelected={category === "Fitness"}
            handleOnClick={handleCategory}
          >
            <StyledRotageView>
              <FitnessIcon />
            </StyledRotageView>
          </Category>
          <Category
            title="Mental_health"
            isSelected={category === "Mental_health"}
            handleOnClick={handleCategory}
          >
            <MentalIcon />
          </Category>
          <Category
            title="Habit"
            isSelected={category === "Habit"}
            handleOnClick={handleCategory}
          >
            <HabitIcon />
          </Category>
        </StyledCategoryInner>
      </StyledCategoryContainer>
      <StyledChallengeContainer>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ChallengeBlock
              key={item.challengeId}
              thumbnailUrl={item.thumbnailUrl}
              title={item.name}
              person={item.participants}
              handleOnClick={() => {
                navigation.dispatch(
                  CommonActions.navigate({
                    name: "ChallengeDetailScreen",
                    params: {
                      id: item.challengeId,
                      thumbnail: item.thumbnailUrl,
                      title: item.name,
                      person: item.participants,
                    },
                  })
                );
              }}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.challengeId}
          numColumns={2}
        />
      </StyledChallengeContainer>
      <Footer />
    </StyledContainer>
  );
};

export default ExploreScreen;

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

const StyledCategoryContainer = styled(View)`
  width: 100%;
  height: auto;
  padding: 120px 22px 20px 22px;
  box-sizing: border-box;
  background-color: ${color.primary};
`;

const StyledCategoryTitle = styled(Text)`
  color: ${color.white};
  font-size: 24px;
  font-weight: 600;
`;

const StyledCategoryInner = styled(View)`
  width: 100%;
  display: flex;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledRotageView = styled(View)`
  transform: rotateZ(30deg);
`;

const StyledChallengeContainer = styled(View)`
  width: 100%;
  height: auto;
  padding: 30px 22px 120px 22px;
  box-sizing: border-box;
  background-color: ${color.white};
  flex: 1;
`;
