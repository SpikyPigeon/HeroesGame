import {Client, Server} from "socket.io";
import {Logger} from "@nestjs/common";
import {
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer, WsException, WsResponse
} from "@nestjs/websockets";

import {SocketService} from "./socket.service";
import {ChatPayload} from "heroes-common";

@WebSocketGateway({namespace: "chat"})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	private readonly logger: Logger = new Logger(ChatGateway.name);

	@WebSocketServer()
	private readonly server!: Server;

	constructor(private readonly sockets: SocketService) {
	}

	handleConnection(client: Client) {
		this.logger.log(`CONNECTED => ${client.id}`);
		this.server.emit("test");
	}

	handleDisconnect(client: Client) {
		this.logger.log(`DISCONNECTED => ${client.id}`);
	}

	@SubscribeMessage("echo")
	async sendBack(@MessageBody() payload: ChatPayload): Promise<WsResponse<string>> {
		try {
			const user = await this.sockets.validatePayload(payload);
			this.logger.log(`sendBack => ${user.email}`);
			return {
				event: "echo",
				data: `ECHO@${payload.world}:${payload.x}.${payload.y} => ${payload.content}`,
			};
		} catch(e) {
			throw new WsException(e);
		}
	}
}
