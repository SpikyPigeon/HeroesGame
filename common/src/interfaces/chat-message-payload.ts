import {SocketPayload} from "./socket-payload";

export interface ChatMessagePayload extends SocketPayload {
	content: string;
}
