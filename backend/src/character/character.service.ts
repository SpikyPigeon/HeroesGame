import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {CharacterEntity} from "./character.entity";
import {EquipmentEntity} from "./equipment.entity";
import {AvatarService} from "./avatar.service";
import {AvatarEntity} from "./avatar.entity";
import {UserEntity} from "../user";
import {SquareService, WorldService} from "../world";
import {UpdateCharacterInfoDto} from "./character.dto";

@Injectable()
export class CharacterService {
	constructor(
		@Inject("CHARACTER_REPOSITORY")
		private readonly characters: Repository<CharacterEntity>,
		@Inject("EQUIPMENT_REPOSITORY")
		private readonly equipments: Repository<EquipmentEntity>,
		private readonly avatars: AvatarService,
		private readonly squares: SquareService,
		private readonly worlds: WorldService,
	) {
	}

	async findAll(): Promise<Array<CharacterEntity>> {
		return await this.characters.find();
	}

	async findOne(id: string): Promise<CharacterEntity> {
		return await this.characters.findOneOrFail(id);
	}

	async create(owner: UserEntity, name: string, avatarId: number): Promise<CharacterEntity> {
		const char = await this.characters.save(this.characters.create({
			currentHealth: 0,
			currentMana: 0,
			owner,
			name,
			avatar: await this.avatars.findOne(avatarId),
		}));
		await this.createEquipment(char);
		return await this.findOne(char.id);
	}

	async update(id: string, data: Partial<UpdateCharacterInfoDto>): Promise<CharacterEntity> {
		const {avatarId, ...info} = data;
		const character = {...await this.findOne(id), ...info};
		if(data.avatarId){
			character.avatar = await this.avatars.findOne(data.avatarId);
		}
		return await this.characters.save(character);
	}

	async moveTo(charId: string, worldId: number, x: number, y: number): Promise<CharacterEntity> {
		const player = await this.findOne(charId);
		if (player.square.worldId != worldId) {
			player.square = await this.squares.findOne(worldId, 0, 0);
			return await this.characters.save(player);
		} else {
			const world = await this.worlds.findOne(worldId);
			if (x < 0 || y < 0 || x >= world.limitX || y >= world.limitY) {
				throw new Error("Target square is out of bounds!");
			} else {
				const target = await this.squares.findOne(worldId, x, y);
				if (Math.abs(player.square.x - target.x) <= 1 && Math.abs(player.square.y - target.y) <= 1) {
					if (player.square.x === target.x && player.square.y === target.y) {
						return player;
					} else {
						player.square = target;
						return await this.characters.save(player);
					}
				} else {
					throw new Error("Target square is out of range!");
				}
			}
		}
	}

	private async createEquipment(character: CharacterEntity): Promise<EquipmentEntity> {
		return await this.equipments.save(this.equipments.create({
			player: character,
		}));
	}
}
