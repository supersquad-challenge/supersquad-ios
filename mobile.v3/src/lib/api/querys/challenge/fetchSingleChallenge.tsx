import { API_BASE_URL } from "@env";

type Props = {
  challengeId: string;
};

export const fetchSingleChallenge = async ({ challengeId }: Props) => {
  const res = await fetch(`${API_BASE_URL}/challenge/${challengeId}`);
  const data = res.json();
  return data;
};
