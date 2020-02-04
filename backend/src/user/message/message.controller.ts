import {Body, Controller, Delete, Get, Param, Post, UseGuards} from "@nestjs/common";
import {MessageService} from "./message.service";
import {ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {MessageEntity} from "./message.entity";
import {CreateMessageInfo} from "./message.dto";
import {AuthGuard} from "@nestjs/passport";

@ApiTags("user")
@Controller()
export class MessageController {
	constructor(private readonly messages: MessageService) {
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: MessageEntity})
	@ApiBody({type: CreateMessageInfo})
	@UseGuards(AuthGuard("jwt"))
	@Post()
	async create(@Body() data: CreateMessageInfo): Promise<MessageEntity>{
		return this.messages.create(data);
	}

	@ApiOkResponse({type : MessageEntity, isArray: true})
	@Get()
	async findAll(): Promise<MessageEntity[]>{
		return await this.messages.findAll();
	}

	@ApiOkResponse({type: MessageEntity, isArray: true})
	@Get("sent/:senderId")
	async findSentByUser(@Param("senderId") userId: string): Promise<MessageEntity[]>{
		return await this.messages.findSentByUser(userId);
	}

	@ApiOkResponse({type: MessageEntity, isArray: true})
	@Get("receivedId:userId")
	async findReceived(@Param() userId: string): Promise<MessageEntity[]>{
		return await this.messages.findReceivedByUser(userId);
	}

	@ApiOkResponse({type: MessageEntity})
	@Get(":id")
	async findOne(@Param() id: string): Promise<MessageEntity>{
		return await this.messages.findOne(id);
	}

	@Delete(":msgId")
	async deleteById(@Param() msgId: string){
		return await this.messages.deleteById(msgId);
	}
}
