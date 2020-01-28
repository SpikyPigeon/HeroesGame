import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {EncounterDropEntity} from "./encounter-drop.entity";
import {EncounterEntity} from "./encounter.entity";

export interface EncounterInfo{
	worldId: number,
	x: number,
	y: number,
	monsterId: number,
	spawnChance: number,
}

@Injectable()
export class EncounterService {
	constructor(
		@Inject("ENCOUNTER_REPOSITORY")
		private readonly encounters: Repository<EncounterEntity>,
		@Inject("ENCOUNTER_DROP_REPOSITORY")
		private readonly drops: Repository<EncounterDropEntity>,
	) {
	}


}
