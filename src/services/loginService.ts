import { LoginRequest, RegisterRequest } from "@/types/auth"
import api from "./api"

const authService = {
    login: async (params: LoginRequest) => {
        const res = await api.post("/api/Auth/login", params).catch((error) => {
            if (error.response.status === 400 || error.response.status === 401) {
                return error.response;
            }
            return error;
        });
        if (res.status === 200 || res.status === 204) {
            sessionStorage.setItem("gerenciadorToken", res.data.token)
        }
        return res;
    },
    register: async (params: RegisterRequest) => {
        const res = await api.post("/api/Auth/register", params).catch((error) => {
            if (error.response.status === 400 || error.response.status === 401) {
                return error.response;
            }
            return error;
        })
        return res;
    }
}

export default authService;