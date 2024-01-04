import apiClient from "./api";

export default async function forgotPassword(email: string) {
  const res = await apiClient.post("/account/forgot-password", {
    email: email,
    urlFE: "http://localhost:3000",
  });

  return res;
}
