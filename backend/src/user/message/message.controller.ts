import {Body, Controller, Delete, Get, Logger, Param, Post, UseGuards} from "@nestjs/common";
import {MessageService} from "./message.service";
import {ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {MessageEntity} from "./message.entity";
import {CreateMessageInfo} from "./message.dto";
import {AuthGuard} from "@nestjs/passport";

@ApiTags("user")
@Controller()
export class MessageController {
	private readonly logger: Logger = new Logger(MessageController.name);

	constructor(private readonly messages: MessageService) {
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: MessageEntity})
	@ApiBody({type: CreateMessageInfo})
	@UseGuards(AuthGuard("jwt"))
	@Post()
	async create(@Body() data: CreateMessageInfo): Promise<MessageEntity> {
		this.logger.log(`create`);
		return this.messages.create(data);
	}

	@ApiOkResponse({type: MessageEntity, isArray: true})
	@Get()
	async findAll(): Promise<MessageEntity[]> {
		this.logger.log(`findAll`);
		return await this.messages.findAll();
	}

	@ApiOkResponse({type: MessageEntity, isArray: true})
	@Get("sent/:senderId")
	async findSentByUser(@Param("senderId") userId: string): Promise<MessageEntity[]> {
		this.logger.log(`findSentByUser`);
		return await this.messages.findSentByUser(userId);
	}

	@ApiOkResponse({type: MessageEntity, isArray: true})
	@Get("receivedId:userId")
	async findReceived(@Param() userId: string): Promise<MessageEntity[]> {
		this.logger.log(`findReceived`);
		return await this.messages.findReceivedByUser(userId);
	}

	@ApiOkResponse({type: MessageEntity})
	@Get(":id")
	async findOne(@Param() id: string): Promise<MessageEntity> {
		this.logger.log(`findOne => ${id}`);
		return await this.messages.findOne(id);
	}

	@Delete(":msgId")
	async deleteById(@Param() msgId: string) {
		this.logger.log(`deleteById => ${msgId}`);
		return await this.messages.deleteById(msgId);
	}
}
