import apiClient from "./api";

export async function login(username: string , password: string){
    const resp = await apiClient.post("/identity/token", {
        employeeNo:username,
        password: password
    })

    console.log(resp.data);
    

    return resp.data
}