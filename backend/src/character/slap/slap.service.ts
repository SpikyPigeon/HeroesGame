import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {CharacterService} from "../character.service";
import {SlapEntity} from "./slap.entity";
import {characterProviders} from "../character.provider";

@Injectable()
export class SlapService {
	constructor(
		@Inject("CHARACTER_SLAP_REPOSITORY")
		private readonly slaps: Repository<SlapEntity>,
		private readonly characters: CharacterService,
	) {
	}

	async create(slapperID: string, slappedID: string): Promise<SlapEntity> {
		const slap = new SlapEntity();
		slap.slapper = await this.characters.findOne(slapperID);
		slap.slapped = await this.characters.findOne(slappedID);
		return slap;
	}

	async countAll(): Promise<number> {
		return await this.slaps.count();
	}

	async countSlapped(id: string): Promise<number>{
		const character = await this.characters.findOne(id);
		return await this.slaps.count({
			where: {slapped: character}});
	}

	async countSlapper(id: string): Promise<number>{
		const character = await this.characters.findOne(id);
		return await this.slaps.count({
			where: { slapper: character}});
	}

	


}
