import {action, Action, thunk, Thunk, thunkOn, ThunkOn} from "easy-peasy";
import io from "socket.io-client";

import {ChatMessagePayload, ChatMovePayload, ChatResponsePayload} from "heroes-common/src";
import Socket = SocketIOClient.Socket;
import {AppStore} from "./index";

export interface ChatStore {
	socket: Socket | null;
	messages: Array<ChatResponsePayload>;

	setSocket: Action<ChatStore, Socket | null>;

	clearMessages: Action<ChatStore>;
	addMessage: Action<ChatStore, ChatResponsePayload>;

	connect: Thunk<ChatStore, void, any, AppStore>;
	disconnect: Thunk<ChatStore>;
	send: Thunk<ChatStore, string>;
	onMove: ThunkOn<ChatStore, any, AppStore>;
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

	connect: thunk((state, payload, {getStoreState}) => {
		state.disconnect();
		const socket = io("/chat");
		state.setSocket(socket);

		socket.on("connect", () => {
			const token = localStorage.getItem("userJWT");
			const store = getStoreState();
			if (store.character.character && token) {
				const char = store.character.character;
				const data: ChatMovePayload = {
					token,
					world: char.square.world.id,
					x: char.square.x,
					y: char.square.y,
				};
				socket.emit("move-to", data);
			}
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

	onMove: thunkOn(
		(actions, storeActions) => storeActions.character.moveTo,
		(actions, payload, {getState}) => {
			console.log("store.character.moveTo fired");
			const token = localStorage.getItem("userJWT");
			const socket = getState().socket;
			if (socket && token) {
				const data: ChatMovePayload = {
					token,
					world: payload.payload.worldId,
					x: payload.payload.x,
					y: payload.payload.y,
				};
				socket.emit("move-to", data);
				actions.clearMessages();
			}
		},
	),
};
