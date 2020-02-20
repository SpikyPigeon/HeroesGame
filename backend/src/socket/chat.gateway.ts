import {Client, Server, Socket} from "socket.io";
import {Logger} from "@nestjs/common";
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer, WsException, WsResponse
} from "@nestjs/websockets";

import {ChatMovePayload, ChatMessagePayload, ChatResponsePayload} from "heroes-common";
import {SocketService} from "./socket.service";

@WebSocketGateway({namespace: "chat"})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	private readonly logger: Logger = new Logger(ChatGateway.name);

	@WebSocketServer()
	private readonly server!: Server;

	constructor(private readonly sockets: SocketService) {
	}

	handleConnection(client: Client) {
		this.logger.log(`CONNECTED => ${client.id}`);
	}

	handleDisconnect(client: Client) {
		this.logger.log(`DISCONNECTED => ${client.id}`);
	}

	@SubscribeMessage("move-to")
	async moveTo(
		@MessageBody() payload: ChatMovePayload,
		@ConnectedSocket() client: Socket,
	) {
		try {
			const user = await this.sockets.validatePayload(payload);
			const char = await this.sockets.getCharacter(user.id);
			this.logger.log(`moveTo => ${char.name} to W${payload.world}X${payload.x}Y${payload.y}`);

			Object.keys(client.rooms).forEach(value => {
				if (value.startsWith("W")) {
					client.leave("value");
				}
			});

			client.join(`W${payload.world}X${payload.x}Y${payload.y}`);
		} catch(e) {
			throw new WsException(e);
		}
	}

	@SubscribeMessage("send-message")
	async sendMessage(@MessageBody() payload: ChatMessagePayload) {
		try {
			const user = await this.sockets.validatePayload(payload);
			const char = await this.sockets.getCharacter(user.id);
			this.logger.log(`sendMessage => ${char.name}`);

			const data: ChatResponsePayload = {
				characterName: char.name,
				userId: user.id,
				content: payload.content,
			};
			this.server
				.in(`W${char.square.world.id}X${char.square.x}Y${char.square.y}`)
				.emit("message-added", data);
		} catch(e) {
			throw new WsException(e);
		}
	}

	@SubscribeMessage("echo")
	async sendBack(@MessageBody() payload: ChatMessagePayload): Promise<WsResponse<string>> {
		try {
			const user = await this.sockets.validatePayload(payload);
			this.logger.log(`sendBack => ${user.email}`);
			return {
				event: "echo",
				data: `ECHO => ${payload.content}`,
			};
		} catch(e) {
			throw new WsException(e);
		}
	}
}
