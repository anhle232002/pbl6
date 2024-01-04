import apiClient from "./api";

export default async function forgotPassword(email: string) {
  const res = await apiClient.post("/account/forgot-password", {
    email: email,
    urlFE:
      process.env.NODE_ENV !== "development"
        ? "https://pbl6-phi.vercel.app/"
        : "http://localhost:3000",
  });

  return res;
}
