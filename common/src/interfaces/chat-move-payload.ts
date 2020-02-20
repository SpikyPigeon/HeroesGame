import {SocketPayload} from "./socket-payload";

export interface ChatMovePayload extends SocketPayload {
	world: number;
	x: number;
	y: number;
}
