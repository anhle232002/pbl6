import { Cinema } from "@/types/Cinema";
import apiClient from "./api";

export async function getCinemaById(id : string | number){
    
    const resp = await apiClient.get(`/v1/cinema/${id}`)
    
    return resp.data.data as Cinema
} 