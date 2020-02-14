import {NonPlayerCharacter} from "./non-player-character";
import {PlayerCharacter} from "./player-character";
import {Encounter} from "./encounter";
import {Structure} from "./structure";

export interface SquareContent {
	encounters: Array<Encounter>;
	npcs: Array<NonPlayerCharacter>;
	structures: Array<Structure>;
	players: Array<PlayerCharacter>;
}
