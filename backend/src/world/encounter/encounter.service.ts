import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {EncounterDropEntity} from "./encounter-drop.entity";
import {EncounterEntity} from "./encounter.entity";

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
