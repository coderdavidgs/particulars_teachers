import { teacher } from "@data/@types/teacher";
import { ApiService } from "./ApiService"

export const getUser = async () => {
    return await ApiService.get<teacher>('/api/me', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token_yourteacher')}`
        }
    });
}