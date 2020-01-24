import {PlayerCharacter} from "./player-character";

export interface CharacterSlap {
	id: string;
	slapper: PlayerCharacter;
	slapped: PlayerCharacter;
	createdAt: Date;
}
