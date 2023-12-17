import { Poster } from "@/types/Poster";
import apiClient from "./api";

export async function getPoster(){
    
    const resp = await apiClient.get("/v1/Poster")
    
    return resp.data.data as Poster[]
} 