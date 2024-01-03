import apiClient from "./api";

export interface SignupParams {
  username: string;
  customerName: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: Date;
  password: string;
}

export async function signup(params: SignupParams) {
  const resp = await apiClient.post("/v1/customer", params);
  return resp.data;
}
