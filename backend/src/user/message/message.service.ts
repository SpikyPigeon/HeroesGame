import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {MessageEntity} from "./message.entity";
import {UserService} from "../user.service";

@Injectable()
export class MessageService {
	constructor(
		@Inject("USER_MESSAGE_REPOSITORY")
		private readonly avatars: Repository<MessageEntity>,
		private readonly users: UserService,
	) {
	}
}
