import {
	MessageBody,
	OnGatewayConnection, OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsResponse
} from "@nestjs/websockets";
import {Logger, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {Server, Client} from "socket.io";

@WebSocketGateway({namespace: "chat"})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	private readonly logger: Logger = new Logger(ChatGateway.name);

	@WebSocketServer()
	private readonly server!: Server;

	constructor() {
	}

	handleConnection(client: Client) {
		this.logger.log(`CONNECTED => ${client.id}`);
	}

	handleDisconnect(client: Client) {
		this.logger.log(`DISCONNECTED => ${client.id}`);
	}

	@UseGuards(AuthGuard("jwt"))
	@SubscribeMessage("echo")
	async sendBack(@MessageBody() data: string): Promise<WsResponse<string>> {
		this.logger.log(`sendBack => ${data}`);
		return {data: `ECHO : ${data}`, event: "echo"};
	}
}
