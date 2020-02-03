import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {MessageEntity} from "./message.entity";
import {UserService} from "../user.service";
import {CreateMessageInfo} from "./message.dto";

@Injectable()
export class MessageService {
	constructor(
		@Inject("USER_MESSAGE_REPOSITORY")
		private readonly messages: Repository<MessageEntity>,
		private readonly users: UserService,
	) {
	}

	async create(data: CreateMessageInfo): Promise<MessageEntity>{
		return await this.messages.save(this.messages.create({
			receiver: await this.users.findOneById(data.receiver),
			previous: await this.findOne(data.previous),
			title : data.title,
			content: data.content,
		}));
	}

	async findAll(): Promise<MessageEntity[]>{
		return await this.messages.find();
	}

	async findOne(id: string): Promise<MessageEntity>{
		return await this.messages.findOneOrFail(id);
	}

	async findWithUser(userId: string): Promise<MessageEntity[]> {
		return await this.messages.createQueryBuilder("msg")
			.where("msg.senderId = :user OR msg.receiverId = :user", {user: userId})
			.getMany();
	}

	async deleteById(msgId: string){
		await this.messages.delete(msgId);
	}
}
