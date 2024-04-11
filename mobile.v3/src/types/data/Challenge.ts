export type ACResponse = {
  challengeId: string;
  category: string;
  name: string;
  thumbnailUrl: string;
  participants: number;
};

export type ACByUserIdResponse = {
  userChallengeId: string;
  challengeId: string;
  status: string;
  category: string;
  name: string;
  thumbnailUrl: string;
  successRate: number;
  challengeStartAt: string;
  challengeEndAt: string;
};

export type SCByChallengeIdResponse = {
  challengeId: string;
  name: string;
  thumbnailUrl: string;
  participants: number;
  frequency: string;
  howTo: string;
  description: string;
};

export type SCByUserChallengeIdResponse = {
  thumbnailUrl: string;
  name: string;
  participants: number;
  successRate: number;
  deposit: number;
  totalDeposit: number;
  cryptoSuccessPool: number;
  cryptoFailPool: number;
  challengeStartAt: string;
  challengeEndAt: string;
  frequency: string;
  howTo: string;
  description: string;
  status: string;
  isPhotoUploadedToday: boolean;
  isPaybackPaid: boolean;
  profileUrls: string[];
  depositMethod: string;
};
