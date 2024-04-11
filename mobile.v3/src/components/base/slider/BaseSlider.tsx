import { View, Platform } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { Slider } from "@miblanchard/react-native-slider";

type Props = {
  min: number;
  max: number;
  value: number;
  bgColor: string;
  color: string;
  handleOnChange: (params: string) => void;
};

const BaseSlider = ({
  min,
  max,
  value,
  bgColor,
  color,
  handleOnChange,
}: Props) => {
  return (
    <StyledSliderContainer>
      <Slider
        containerStyle={{
          width: "100%",
        }}
        value={value}
        minimumValue={min}
        maximumValue={max}
        maximumTrackTintColor={bgColor}
        minimumTrackTintColor={color}
        thumbTintColor={color}
        onValueChange={(value) => {
          const _value = value[value.length - 1];
          handleOnChange(_value.toString());
        }}
        trackStyle={{
          height: 15,
          borderRadius: 7.5,
        }}
        thumbStyle={{
          width: 25,
          height: 25,
          borderWidth: 3,
          borderColor: "#fff",
          borderRadius: 13,
          ...Platform.select({
            ios: {
              shadowColor: "rgb(50, 50, 50, 0)",
              shadowOpacity: 0.5,
              shadowRadius: 5,
              shadowOffset: {
                height: 25,
                width: 25,
              },
            },
            android: {
              elevation: 5,
            },
          }),
        }}
        step={1}
      />
    </StyledSliderContainer>
  );
};

export default BaseSlider;

const StyledSliderContainer = styled(View)`
  flex: 1;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
`;
