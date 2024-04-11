import AsyncStorage from "@react-native-async-storage/async-storage";
import { SetStateAction, Dispatch } from "react";

export const checkUserInfo = async (
  setUserInfo: Dispatch<SetStateAction<string | null>>
) => {
  const user = await AsyncStorage.getItem("@user");
  setUserInfo(user);
};
