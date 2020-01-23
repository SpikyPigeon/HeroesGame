import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {MonsterTypeEntity} from "./monster-type.entity";
import {MonsterEntity} from "./monster.entity";

@Injectable()
export class MonsterService {
	constructor(
		@Inject("MONSTER_REPOSITORY")
		private readonly monsters: Repository<MonsterEntity>,
		@Inject("MONSTER_TYPE_REPOSITORY")
		private readonly types: Repository<MonsterTypeEntity>,
	) {
	}
}
