import {createElement, FunctionComponent} from "react";
import {ThunkCreator} from "easy-peasy";
import {Card} from "@material-ui/core";

import {Avatar, config, Encounter, Monster, PlayerCharacter, Square, UpdateCharacterInfo, User} from "heroes-common";
import {useStoreActions, useStoreState} from "../../store";

class PlayerCharacterAction implements PlayerCharacter {
	avatar: Avatar;
	createdAt: Date;
	currentEnergy: number;
	currentHealth: number;
	currentMana: number;
	dexterity: number;
	experience: number;
	gem: number;
	gold: number;
	id: string;
	intellect: number;
	isActive: boolean;
	isDead: boolean;
	level: number;
	name: string;
	owner: User;
	square: Square;
	strength: number;
	updatedAt: Date;
	vitality: number;

	private readonly update: ThunkCreator<Partial<UpdateCharacterInfo>, any>;

	constructor(info: PlayerCharacter, updateChar: ThunkCreator<Partial<UpdateCharacterInfo>, any>) {
		this.avatar = info.avatar;
		this.createdAt = info.createdAt;
		this.currentEnergy = info.currentEnergy;
		this.currentHealth = info.currentHealth;
		this.currentMana = info.currentMana;
		this.dexterity = info.dexterity;
		this.experience = info.experience;
		this.gem = info.gem;
		this.gold = info.gold;
		this.id = info.id;
		this.intellect = info.intellect;
		this.isActive = info.isActive;
		this.isDead = info.isDead;
		this.level = info.level;
		this.name = info.name;
		this.owner = info.owner;
		this.square = info.square;
		this.strength = info.strength;
		this.updatedAt = info.updatedAt;
		this.vitality = info.vitality;

		this.update = updateChar;
	}

	async attack(target: Monster) {
		const {character} = config;
	}
}

interface WorldActionProps {
	encounters: Array<Encounter>;
}

export const WorldAction: FunctionComponent<WorldActionProps> = ({encounters}) => {
	const updateChar = useStoreActions(state => state.character.update);
	const character = useStoreState(state => state.character.character);

	if (!character) {
		return null;
	}

	const action = new PlayerCharacterAction(character, updateChar);

	return <Card>

	</Card>;
};
