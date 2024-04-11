import { StyleSheet, Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { Slider } from "@miblanchard/react-native-slider";
import Tooltip from "@/src/components/base/etc/tooltip/Tooltip";

type Props = {
  min: number;
  max: number;
  value: number | undefined;
  bgColor: string;
  color: string;
  isTooltip: boolean;
};

const LinearProgressbar = ({
  min,
  max,
  value,
  bgColor,
  color,
  isTooltip,
}: Props) => {
  const _value = value === undefined ? 0 : value;
  return (
    <StyledSliderContainer>
      <Slider
        containerStyle={{
          width: "100%",
        }}
        value={_value}
        minimumValue={min}
        maximumValue={max}
        maximumTrackTintColor={bgColor}
        minimumTrackTintColor={color}
        thumbStyle={{
          width: 25,
          height: 15,
          backgroundColor: color,
        }}
        trackStyle={{
          height: 15,
          borderRadius: 8,
        }}
        disabled={true}
      />
      <Tooltip rate={_value} />
    </StyledSliderContainer>
  );
};

export default LinearProgressbar;

const StyledSliderContainer = styled(View)`
  flex: 1;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  position: relative;
`;
