import apiClient from "./api";

interface CreateMerchantParams {
  merchantName: string;
  merchantWebLink: string;
  merchantIpnUrl: string;
  merchantReturnUrl: string;
}

export default async function createMerchant(params: CreateMerchantParams) {
  const res = await apiClient.post("/v1/merchant", params);

  return res;
}
