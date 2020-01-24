import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {createHmac} from "crypto";
import {UserEntity} from "./user.entity";
import {BankService} from "../bank";

@Injectable()
export class UserService {
	constructor(
		@Inject("USER_REPOSITORY")
		private readonly users: Repository<UserEntity>,
		private readonly banks: BankService,
	) {
	}

	private static hashPassword(value: string): string {
		return createHmac("sha256", value).digest("hex");
	}

	async findOneById(id: string): Promise<UserEntity> {
		return this.users.findOneOrFail(id);
	}

	async findOneByEmail(email: string): Promise<UserEntity> {
		return this.users.findOneOrFail({email});
	}

	async validatePassword(id: string, pass: string): Promise<boolean> {
		const user = await this.users.findOneOrFail(id, {select: ["id", "password_hash"]});
		return UserService.hashPassword(pass) === user.password_hash;
	}

	async changeProfile(id: string, firstName: string, lastName: string, email: string): Promise<UserEntity> {
		const user = await this.findOneById(id);
		user.firstName = firstName;
		user.lastName = lastName;
		user.email = email;
		return await this.users.save(user);
	}

	async changePassword(id: string, oldPass: string, newPass: string): Promise<UserEntity> {
		const user = await this.users.findOneOrFail(id, {select: ["id", "password_hash"]});

		if (UserService.hashPassword(oldPass) === user.password_hash) {
			user.password_hash = UserService.hashPassword(newPass);
			return await this.users.save(user);
		} else {
			throw new Error("Old Password does not match");
		}
	}

	async create(email: string, pass: string, firstName: string, lastName: string): Promise<UserEntity> {
		const bank = await this.banks.create();
		const user = this.users.create({
			password_hash: UserService.hashPassword(pass),
			email,
			firstName,
			lastName,
			bank,
		});

		const {id} = await this.users.save(user);
		return await this.findOneById(id);
	}
}
