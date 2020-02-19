import {SocketPayload} from "./socket-payload";

export interface ChatPayload extends SocketPayload {
	world: number;
	x: number;
	y: number;
	content: string;
}
