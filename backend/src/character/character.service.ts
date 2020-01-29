import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {CharacterEntity} from "./character.entity";
import {EquipmentEntity} from "./equipment.entity";
import {AvatarService} from "./avatar.service";
import {UserEntity} from "../user";
import {AvatarEntity} from "./avatar.entity";
import {WorldService} from "../world";

@Injectable()
export class CharacterService {
	constructor(
		@Inject("CHARACTER_REPOSITORY")
		private readonly characters: Repository<CharacterEntity>,
		@Inject("EQUIPMENT_REPOSITORY")
		private readonly equipments: Repository<EquipmentEntity>,
		private readonly avatars: AvatarService,
		private readonly worlds: WorldService,
	) {
	}

	async findAll(): Promise<Array<CharacterEntity>> {
		return await this.characters.find();
	}

	async findOne(id: string): Promise<CharacterEntity> {
		return await this.characters.findOneOrFail(id);
	}

	async create(owner: UserEntity, name: string, avatar: AvatarEntity): Promise<CharacterEntity> {
		const char = await this.characters.save(this.characters.create({
			currentHealth: 0,
			currentMana: 0,
			owner,
			name,
			avatar,
		}));

		await this.createEquipment(char);
		return await this.findOne(char.id);
	}

	async updateStats(id: string, strength: number, dexterity: number, vitality: number, intellect: number): Promise<CharacterEntity> {
		const char = await this.findOne(id);
		char.strength = strength;
		char.dexterity = dexterity;
		char.vitality = vitality;
		char.intellect = intellect;
		return await this.characters.save(char);
	}

	private async createEquipment(character: CharacterEntity): Promise<EquipmentEntity> {
		return await this.equipments.save(this.equipments.create({
			player: character,
		}));
	}
}
