import { LoginData } from "./interfaces/login-data.interface";
import { RegisterData } from "./interfaces/register-data.interface";
import { api } from "../common/api";

export async function login(data: LoginData) {
  const response = await api.post(
    `/auth/login`,
    data,
    { withCredentials: true }
  );
  return response.data;
}

export async function register(data: RegisterData) {
  const response = await api.post(
    `/auth/register`, 
    data,
    { withCredentials: true }
  );
  return response.data;
}

export async function logout() {
  const response = await api.delete(
    `/auth/logout`,
    { withCredentials: true }
  );
  return response.data;
}
