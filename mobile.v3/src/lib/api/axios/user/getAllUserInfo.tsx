import axios from "axios";

export const getAllUserInfo = async () => {
  try {
    const res = await axios.get(`${process.env.API_BASE_URL}/user/all`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
