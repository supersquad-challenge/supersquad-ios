import axios from "axios";

type Props = {
  userInfoId: string;
  nickname: string;
};

export const setNickname = async ({ userInfoId, nickname }: Props) => {
  try {
    const res = await axios.post(`${process.env.API_BASE_URL}/user/nickname`, {
      userInfoId: userInfoId,
      nickname: nickname,
    });
    return res;
  } catch (e) {
    console.log(e);
    return {
      status: 0,
    };
  }
};
