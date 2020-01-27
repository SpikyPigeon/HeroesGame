import {Inject, Injectable} from "@nestjs/common";
import {MoreThanOrEqual, Repository} from "typeorm";
import {CharacterService} from "../character.service";
import {SlapEntity} from "./slap.entity";

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

	async findAll(): Promise<Array<SlapEntity>> {
		return await this.slaps.find({
			order: {createdAt: "DESC"}
		});
	}

	async findAllWithCharacter(id: string): Promise<Array<SlapEntity>> {
		return await this.slaps.createQueryBuilder("slap")
			.where('slap.slapperId = :id OR slap.slappedId = :id', {
				id
			})
			.orderBy("slap.createdAt", "DESC")
			.getMany();
	}

	async countAll(): Promise<number> {
		return await this.slaps.count();
	}

	async countSlapped(id: string): Promise<number> {
		const character = await this.characters.findOne(id);
		return await this.slaps.count({
			where: {slapped: character}
		});
	}

	async countSlapper(id: string): Promise<number> {
		const character = await this.characters.findOne(id);
		return await this.slaps.count({
			where: {slapper: character}
		});
	}

	async checkSlappable(slapperID: string, slappedID: string): Promise<boolean> {
		const today = new Date();
		const yesterday = new Date().setDate(today.getDate() - 1);
		const count = await this.slaps.count({
			where: {
				createdAt: MoreThanOrEqual(yesterday)
			}
		});
		return count < 3;
	}

}
