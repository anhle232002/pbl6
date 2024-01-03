import apiClient from "./api";

interface ResetPasswordParam {
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
}

export default async function resetPassword(params: ResetPasswordParam) {
  const res = await apiClient.post("/account/reset-password", params);

  return res;
}
