import {Bank} from "./bank";

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	bank: Bank;
	createdAt: Date;
	updatedAt: Date;
	isActive: boolean;
	isAdmin: boolean;
}
