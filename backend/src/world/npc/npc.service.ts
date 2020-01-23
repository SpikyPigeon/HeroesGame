import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {NpcEntity} from "./npc.entity";

@Injectable()
export class NpcService {
	constructor(
		@Inject("NPC_REPOSITORY")
		private readonly npcs: Repository<NpcEntity>,
	) {
	}
}
