import {
  AllChallengesByUserIdResponse,
  AllChallengesReponse,
} from "~/types/data/Challenge";

export const filterChallengeByCategory = (
  challenges: AllChallengesReponse[],
  category: string | undefined
) => {
  if (category === undefined) return challenges;
  const _challenges = challenges.filter((challenge: AllChallengesReponse) => {
    return challenge.category === category;
  });

  return _challenges;
};

export const filterChallengeByStatus = (
  challenges: AllChallengesByUserIdResponse[],
  status: "ongoing" | "complete"
) => {
  if (!challenges || challenges.length === 0) return null;
  const _challenges = challenges.filter(
    (challenge: AllChallengesByUserIdResponse) => {
      return challenge.status === status;
    }
  );

  return _challenges;
};
