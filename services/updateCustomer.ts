import apiClient from "./api";

export interface UpdateCustomerParams {
  id: number;
  customerName: string;
  address: string;
  dateOfBirth: Date;
  phoneNumber: string;
}

export default async function updateCustomer(params: UpdateCustomerParams) {
  const res = await apiClient.put("/v1/customer", params);

  return res.data;
}
