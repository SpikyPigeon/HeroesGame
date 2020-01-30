import {User} from "heroes-common";
import {Context} from "./index";

export class UserService {
	static async getUserInfo(token: string): Promise<User> {
		const response = await Context.get<User>("/user/me", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	}
}
