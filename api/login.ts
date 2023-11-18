import { storage } from "@/utils/storage";
import apiClient from "./api";

export async function login(username: string, password: string) {
  const resp = await apiClient.post("/identity/token", {
    employeeNo: username,
    password: password,
  });

  storage.set("user", JSON.stringify(resp.data.data));
  storage.set("access-token", resp.data.data.token);
  storage.set("logged_in", "true");

  return resp.data;
}
