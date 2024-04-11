import { View, TouchableWithoutFeedback, Animated, Image } from "react-native";
import React, { useRef, useState } from "react";
import styled from "styled-components/native";

const Badge = () => {
  const [isRotated, setIsRotated] = useState<boolean>(false);
  const rotationValue = useRef(new Animated.Value(0)).current;

  const rotateIcon = () => {
    const toValue = isRotated ? 0 : 1;

    Animated.timing(rotationValue, {
      toValue,
      duration: 400, // You can adjust the duration as needed
      useNativeDriver: false,
    }).start(() => {
      setIsRotated(!isRotated);
    });
  };

  const interpolatedRotation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  return (
    <StyledBadge>
      <Animated.View style={{ transform: [{ rotateY: interpolatedRotation }] }}>
        <TouchableWithoutFeedback
          style={{ zIndex: 9, backgroundColor: "#fff" }}
          onPress={rotateIcon}
        >
          <Image
            source={require("@/assets/images/badges/gold_badge.png")}
            resizeMode="cover"
          />
        </TouchableWithoutFeedback>
      </Animated.View>
    </StyledBadge>
  );
};

export default Badge;

const StyledBadge = styled(View)`
  width: 60px;
  height: 60px;
  margin-top: -4px;
`;
