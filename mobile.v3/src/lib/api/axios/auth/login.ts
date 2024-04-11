import { API_BASE_URL } from "@env";

export const login = async (token: string) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};
