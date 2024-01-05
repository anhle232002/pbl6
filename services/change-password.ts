import apiClient from "./api";

interface ChangePasswordParams {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default async function changePassword(params: ChangePasswordParams) {
  const res = await apiClient.post("/account/change-password", params);

  return res.data;
}
