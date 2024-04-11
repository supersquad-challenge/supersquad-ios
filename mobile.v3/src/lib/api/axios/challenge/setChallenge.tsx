import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "@env";
import { SingleRegisteredChallengeResponse } from "~/types/data/Challenge";
type Props = {
  userId: string;
  challengeId: string;
  timezone: string;
};

const setChallenge = async ({
  userId,
  challengeId,
  timezone,
}: Props): Promise<
  AxiosResponse<SingleRegisteredChallengeResponse> | undefined
> => {
  try {
    if (userId && challengeId && timezone) {
      const res = await axios.post(`${API_BASE_URL}/myChallenge/register`, {
        userId: userId,
        challengeId: challengeId,
        timezone: timezone,
      });
      console.log(res);
      return res;
    }
    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      return error.response;
    }
    return undefined;
  }
};

export default setChallenge;
