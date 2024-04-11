import { View, Image } from "react-native";
import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { color } from "@/src/styles/_color";
import styled from "styled-components/native";

type Props = {
  progress: number;
  thumbnail: string;
};

const CircularProgressbar = ({ progress, thumbnail }: Props) => {
  return (
    <StyledCircleContainer>
      <AnimatedCircularProgress
        size={100}
        width={2}
        fill={progress}
        tintColor={color.primary}
        backgroundColor={color.lightGray}
      />
      <StyledThumbnail
        $size={100}
        source={{
          uri: thumbnail as string,
        }}
      />
    </StyledCircleContainer>
  );
};

const StyledCircleContainer = styled(View)`
  width: auto;
  height: auto;
  transform: rotate(-90deg);
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

type StyledThumbnailProps = {
  $size: number;
};

const StyledThumbnail = styled(Image)<StyledThumbnailProps>`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: ${({ $size }) => `translate(-${$size / 2}px, -${$size / 2}px)`};
`;

export default CircularProgressbar;
