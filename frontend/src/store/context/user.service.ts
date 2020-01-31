import {CreateUserInfo, LoginInfo, User} from "heroes-common";
import {Context} from "./index";
import {LoginResponse, ModifyUserProfile, PasswordChange} from "heroes-common/src";

export class UserService {
	static async getUserInfo(token: string): Promise<User> {
		const response = await Context.get<User>("/user/me", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	}

	static async register(info: CreateUserInfo): Promise<User> {
		const response = await Context.post<User>("/user", {
			...info,
		});
		return response.data;
	}

	static async login(credential: LoginInfo): Promise<string> {
		const response = await Context.post<LoginResponse>("/user/auth", {
			...credential,
		});
		return response.data.access_token;
	}

	static async modifyProfile(token: string, profile: ModifyUserProfile): Promise<User> {
		const response = await Context.put<User>("/user/me", profile, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	}

	static async changePassword(token: string, data: PasswordChange): Promise<User> {
		const response = await Context.post("/user/auth/passwd", data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	}
}
