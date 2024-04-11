import { Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { color } from "@/src/styles/_color";

type Props = {
  title: string;
  content: string;
  detail: string | undefined;
};

const Paragraph = ({ title, content, detail }: Props) => {
  const isFlex = title.length <= 10;
  return (
    <StyledContainer $isFlex={isFlex}>
      <StyledTitle $isFlex={isFlex}>{title}</StyledTitle>
      <StyledInner>
        <StyledContent>{content}</StyledContent>
        <StyledDetail $isFlex={isFlex}>{detail}</StyledDetail>
      </StyledInner>
    </StyledContainer>
  );
};

export default Paragraph;

type StyledContainerProps = {
  $isFlex: boolean;
};

const StyledContainer = styled(View)<StyledContainerProps>`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: ${({ $isFlex }) => $isFlex && "row"};
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 30px;
`;

const StyledTitle = styled(Text)<StyledContainerProps>`
  color: ${color.black};
  font-size: 18px;
  font-weight: 600;
  width: ${({ $isFlex }) => ($isFlex ? "103px" : "185px")};
`;

const StyledContent = styled(Text)`
  color: ${color.primary};
  font-size: 18px;
  font-weight: 600;
`;

const StyledInner = styled(View)`
  word-break: keep-all;
  word-wrap: break-word;
`;

const StyledDetail = styled(Text)<StyledContainerProps>`
  color: ${color.black};
  font-size: 16px;
  font-weight: 400;
  margin-top: ${({ $isFlex }) => $isFlex && "15px"};
  max-width: ${({ $isFlex }) => $isFlex && "246px"};
  width: ${({ $isFlex }) => $isFlex && "100%"};
`;
