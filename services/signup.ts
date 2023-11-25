import apiClient from "./api";

export interface SignupParams {
  username: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: Date;
  password: string;
}


export async function signup(params: SignupParams) {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  
  const resp = await apiClient.post("/v1/customer",params);
  return resp.data;
}
