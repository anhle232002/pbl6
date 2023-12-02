import apiClient from "./api";

export async function getCustomer(id: number) {
  const resp = await apiClient.get(`/v1/customer/${id}`);

  return resp.data;
}
