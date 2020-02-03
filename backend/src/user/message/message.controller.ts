import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {MessageService} from "./message.service";
import {ApiBearerAuth, ApiBody, ApiOkResponse} from "@nestjs/swagger";
import {MessageEntity} from "./message.entity";
import {CreateMessageInfo} from "./message.dto";
import {AuthGuard} from "@nestjs/passport";

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
}
