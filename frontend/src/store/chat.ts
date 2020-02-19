import {action, Action} from "easy-peasy";
import io from "socket.io-client";
import Socket = SocketIOClient.Socket;

export interface ChatStore {
	socket: Socket | null;

	connect: Action<ChatStore>;
	disconnect: Action<ChatStore>;
}

export const chatStore: ChatStore = {
	socket: null,

	connect: action(state => {
		if (!state.socket) {
			state.socket = io("/chat");
		}
	}),

	disconnect: action(state => {
		if (state.socket) {
			state.socket.disconnect();
			state.socket = null;
		}
	}),
};
