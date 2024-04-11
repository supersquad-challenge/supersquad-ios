import { API_BASE_URL } from "@env";

type Props = {
  userChallengeId: string;
};

export const fetchSingleChallengeByUserChallengeId = async ({
  userChallengeId,
}: Props) => {
  const res = await fetch(
    `${API_BASE_URL}/myChallenge/myStatus/${userChallengeId}`
  );
  const data = res.json();
  return data;
};
