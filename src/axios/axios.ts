import axios from "axios";
import { BASE_URL } from "../constants/todos.constants";

export const api = axios.create({
	withCredentials: true,
	baseURL: BASE_URL,
	timeout: 1000,
});

api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
	return config;
});
