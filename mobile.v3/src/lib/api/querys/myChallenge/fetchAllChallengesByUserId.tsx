import { API_BASE_URL } from "@env";

type Props = {
  userId: string;
};

export const fetchAllChallengesByUserId = async ({ userId }: Props) => {
  const res = await fetch(
    `${API_BASE_URL}/myChallenge/allMyChallenge/${userId}`
  );
  const data = res.json();
  return data;
};
