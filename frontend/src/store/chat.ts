import {action, Action, thunk, Thunk} from "easy-peasy";
import io from "socket.io-client";

import {ChatMessagePayload, ChatResponsePayload} from "heroes-common/src";
import Socket = SocketIOClient.Socket;

export interface ChatStore {
	socket: Socket | null;
	messages: Array<ChatResponsePayload>;

	setSocket: Action<ChatStore, Socket | null>;

	clearMessages: Action<ChatStore>;
	addMessage: Action<ChatStore, ChatResponsePayload>;

	connect: Thunk<ChatStore>;
	disconnect: Thunk<ChatStore>;
	send: Thunk<ChatStore, string>;
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
		const socket = io("/chat");
		state.setSocket(socket);

		socket.on("connect", () => {
			socket.on("message-added", (payload: ChatResponsePayload) => {
				state.addMessage(payload);
			});
		});
	}),

	disconnect: thunk((state, payload, {getState}) => {
		const socket = getState().socket;
		if (socket) {
			socket.disconnect();
			state.setSocket(null);
		}
	}),

	send: thunk((state, payload, {getState}) => {
		const token = localStorage.getItem("userJWT");
		const socket = getState().socket;
		if (socket && token) {
			const msg: ChatMessagePayload = {
				token,
				content: payload,
			};

			socket.emit("send-message", msg);
		}
	}),
};
