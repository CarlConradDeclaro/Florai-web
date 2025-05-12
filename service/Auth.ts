import useAxios from "@/hooks/useAxios";
import { UserForm, UserFormRegister } from "@/types/user";

const api = useAxios();

export async function login(user: UserForm) {
  try {
    const response = await api.post("token/", user);

    if (response?.data) {
      localStorage.setItem("accessToken", response?.data.access);
      localStorage.setItem("refreshToken", response?.data.refresh);
    }

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function register(user: UserFormRegister) {
  try {
    const response = await api.post("register/", user);
    if (response?.data) {
      console.log("Use", response?.data);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getUserInfo() {
  try {
    const response = await api.get("profile");

    return response;
  } catch (error) {
    console.log(error);
  }
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}
