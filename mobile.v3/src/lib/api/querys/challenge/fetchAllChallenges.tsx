import { API_BASE_URL } from "@env";

export const fetchAllChallenges = async () => {
  const res = await fetch(`${API_BASE_URL}/challenge`);
  const data = res.json();
  return data;
};
