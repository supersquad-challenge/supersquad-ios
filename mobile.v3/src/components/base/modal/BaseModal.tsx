import {
  Text,
  TouchableOpacity,
  Animated,
  View,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { BaseModalProps } from "@/src/types/ui/Modal";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { color } from "@/src/styles/_color";
import DeleteIcon from "@/assets/images/xmark.svg";
import { WithLocalSvg } from "react-native-svg/css";
import { CLOSE_MODAL } from "@/src/redux/slice/modalSlice";

const BaseModal = ({ title, deletePath, children }: BaseModalProps) => {
  const dispatch = useDispatch();
  const opacity = useRef(new Animated.Value(0)).current;
  const transform = useRef(new Animated.Value(400)).current;
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    Animated.timing(transform, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleDisplayModal = () => {
    Animated.timing(transform, {
      toValue: 1000,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      dispatch(CLOSE_MODAL());
    }, 100);
  };

  return (
    <StyledModalContainer>
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          left: 0,
          bottom: 0,
          opacity: opacity,
          transform: [{ translateY: transform }],
        }}
      >
        <StyledModalBody $size={Math.ceil((windowHeight / 3) * 2)}>
          <StyledDeleteIcon>
            <TouchableOpacity
              onPress={() => {
                handleDisplayModal();
              }}
            >
              <WithLocalSvg width={35} height={35} asset={DeleteIcon} />
            </TouchableOpacity>
          </StyledDeleteIcon>
          <StyledModalTitle>{title}</StyledModalTitle>
          {children}
        </StyledModalBody>
      </Animated.View>
    </StyledModalContainer>
  );
};

export default BaseModal;

const StyledModalContainer = styled(View)`
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

type StyledModalBodyProps = {
  $size: number;
};

const StyledModalBody = styled(View)<StyledModalBodyProps>`
  width: 100%;
  height: 100%;
  height: ${({ $size }) => `${$size}px`};
  background-color: ${color.white};
  border-radius: 22px 22px 0px 0px;
`;

const StyledDeleteIcon = styled(View)`
  position: absolute;
  width: 35px;
  height: 35px;
  top: 30px;
  right: 20px;
  z-index: 1000;
`;

const StyledModalTitle = styled(Text)`
  color: ${color.black};
  font-size: 22px;
  font-weight: 600;
  padding-top: 70px;
  padding-left: 22px;
`;
