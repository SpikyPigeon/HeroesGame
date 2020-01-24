import {User} from "./user";

export interface UserMessage {
	id: string;
	sender: User;
	receiver: User;
	previous: UserMessage | null;
	createdAt: Date;
	title: string;
	content: string;
}
