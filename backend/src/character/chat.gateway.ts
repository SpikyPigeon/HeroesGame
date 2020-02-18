import {Client, Server} from "socket.io";
import {Logger} from "@nestjs/common";
import {
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from "@nestjs/websockets";

@WebSocketGateway({namespace: "chat"})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	private readonly logger: Logger = new Logger(ChatGateway.name);

	@WebSocketServer()
	private readonly server!: Server;

	constructor() {
	}

	handleConnection(client: Client) {
		this.logger.log(`CONNECTED => ${client.id}`);
		this.server.emit("test");
	}

	handleDisconnect(client: Client) {
		this.logger.log(`DISCONNECTED => ${client.id}`);
	}

	@SubscribeMessage("echo")
	async sendBack(@MessageBody() data: any): Promise<any> {
		this.logger.log(`sendBack => ${data}`);
		return data;
	}
}
