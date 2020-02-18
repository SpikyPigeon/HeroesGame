import {action, Action} from "easy-peasy";
import {VariantType} from "notistack";
import * as React from "react";

interface NotificationOption {
	key: number;
	variant: VariantType;
	action: (key: number) => void;
	onClose: (event: React.SyntheticEvent<any>, reason: string) => void;
}

interface Notification {
	message: string;
	key: number;
	dismissed: boolean;
	variant: VariantType | undefined;
	action: ((key: number) => void) | undefined;
	onClose: ((event: React.SyntheticEvent<any>, reason: string) => void) | undefined;
}

export interface NotificationStore {
	notifications: Array<Notification>;

	enqueue: Action<NotificationStore, { message: string; options?: Partial<NotificationOption>; }>;
	close: Action<NotificationStore, number | undefined>;
	remove: Action<NotificationStore, number>;
}

export const notificationStore: NotificationStore = {
	notifications: [],

	enqueue: action((state, payload) => {
		state.notifications = [
			...state.notifications,
			{
				message: payload.message,
				dismissed: false,
				key: payload.options?.key ?? new Date().getTime() + Math.random(),
				action: payload.options?.action ?? undefined,
				variant: payload.options?.variant ?? undefined,
				onClose: payload.options?.onClose ?? undefined,
			},
		];
	}),

	close: action((state, payload) => {
		state.notifications = state.notifications.map(value => (
			(!payload || value.key === payload)
				? {dismissed: true, ...value}
				: {...value}
		));
	}),

	remove: action((state, payload) => {
		state.notifications = state.notifications.filter(value => value.key !== payload);
	}),
};
