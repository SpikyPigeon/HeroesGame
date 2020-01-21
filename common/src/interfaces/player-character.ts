import {User} from "./user";
import {Square} from "./square";

export interface PlayerCharacter {
	id: string;
	owner: User;
	name: string;
	avatarId: number;
	square: Square;
	experience: number;
	level: number;
	strength: number;
	dexterity: number;
	vitality: number;
	intellect: number;
	currentHealth: number;
	currentMana: number;
	currentEnergy: number;
	gold: number;
	gem: number;
	isDead: boolean;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}
