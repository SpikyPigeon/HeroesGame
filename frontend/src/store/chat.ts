import {action, Action, thunk, Thunk} from "easy-peasy";
import io from "socket.io-client";
import Socket = SocketIOClient.Socket;
import {ChatResponsePayload} from "heroes-common";

export interface ChatStore {
	socket: Socket | null;
	messages: Array<ChatResponsePayload>;

	setSocket: Action<ChatStore, Socket | null>;

	clearMessages: Action<ChatStore>;
	addMessage: Action<ChatStore, ChatResponsePayload>;

	connect: Thunk<ChatStore>;
	disconnect: Action<ChatStore>;
}

export const chatStore: ChatStore = {
	socket: null,
	messages: [],

	setSocket: action((state, payload) => {
		state.socket = payload;
	}),

	clearMessages: action(state => {
		state.messages = [];
	}),

	addMessage: action((state, payload) => {
		state.messages = [...state.messages, payload];
	}),

	connect: thunk(state => {
		state.disconnect();
		state.setSocket(io("/chat"));
	}),

	disconnect: action(state => {
		if (state.socket) {
			state.socket.disconnect();
			state.socket = null;
		}
	})
};
