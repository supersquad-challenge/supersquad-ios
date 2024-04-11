type ProgressProps = {
  title: string;
  isBorderPrimary: boolean;
  isButtonPrimary: boolean;
};

export const getChallengeType = (status: string, isDup: boolean) => {
  let challengeProgress: ProgressProps = {
    title: "",
    isBorderPrimary: false,
    isButtonPrimary: true,
  };

  if (status == "ongoing" && !isDup) {
    challengeProgress.title = "Verify Mission";
    challengeProgress.isBorderPrimary = true;
  } else if (status == "ongoing" && isDup) {
    challengeProgress.title = "Mission Completed";
    challengeProgress.isButtonPrimary = false;
  } else if (status == "complete") {
    challengeProgress.title = "Read more";
  }

  return challengeProgress;
};
