import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {CharacterService} from "../character.service";
import {SlapEntity} from "./slap.entity";

@Injectable()
export class SlapService {
	constructor(
		@Inject("CHARACTER_SLAP_REPOSITORY")
		private readonly avatars: Repository<SlapEntity>,
		private readonly characters: CharacterService,
	) {
	}
}
