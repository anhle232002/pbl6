import { Cinema } from "@/types/Cinema";
import apiClient from "./api";

export async function getCinemas(){
    
    const resp = await apiClient.get("/v1/cinema")
    
    return resp.data.data as Cinema[]
} 