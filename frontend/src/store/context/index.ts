import axios, {AxiosInstance} from "axios";

export const Context: AxiosInstance = axios.create({
	baseURL: process.env.NODE_ENV === "production"
		? "http://10.100.2.19/api"
		: "http://localhost:3000/api",
	headers: {
		"Content-Type": "application/json; charset=utf-8",
	},
});

export * from "./character.service";
export * from "./world.service";
export * from "./user.service";
