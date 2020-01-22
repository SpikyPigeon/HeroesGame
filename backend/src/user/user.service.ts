import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {UserEntity} from "./user.entity";

@Injectable()
export class UserService {
	constructor(
		@Inject("USER_REPOSITORY")
		private readonly squares: Repository<UserEntity>
	) {
	}
}
