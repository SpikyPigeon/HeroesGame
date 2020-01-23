import {Square} from "./square";
import {Avatar} from "./avatar";
import {User} from "./user";

export interface PlayerCharacter {
	id: string;
	owner: User;
	name: string;
	avatar: Avatar;
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
