import {Repository, SelectQueryBuilder} from "typeorm";
import {Inject, Injectable, OnModuleInit} from "@nestjs/common";
import {ModuleRef} from "@nestjs/core";
import {UpdateCharacterInfoDto} from "./character.dto";
import {SquareService, WorldService} from "../world";
import {CharacterEntity} from "./character.entity";
import {EquipmentEntity} from "./equipment.entity";
import {AvatarService} from "./avatar.service";
import {UserEntity} from "../user";

@Injectable()
export class CharacterService implements OnModuleInit {
	private squares!: SquareService;
	private worlds!: WorldService;

	constructor(
		@Inject("CHARACTER_REPOSITORY")
		private readonly characters: Repository<CharacterEntity>,
		@Inject("EQUIPMENT_REPOSITORY")
		private readonly equipments: Repository<EquipmentEntity>,
		private readonly avatars: AvatarService,
		private readonly refs: ModuleRef,
	) {
	}

	onModuleInit() {
		this.squares = this.refs.get(SquareService, {strict: false});
		this.worlds = this.refs.get(WorldService, {strict: false});
	}

	async findAll(): Promise<Array<CharacterEntity>> {
		return await this.createQuery()
			.getMany();
	}

	async findOne(id: string): Promise<CharacterEntity> {
		const char = await this.createQuery()
			.where("char.id = :id", {id})
			.getOne();

		if (char) {
			return char;
		} else {
			throw new Error(`There are no character with ID = ${id}`);
		}
	}

	async findAllAtLocation(worldId: number, x: number, y: number): Promise<Array<CharacterEntity>> {
		return await this.createQuery()
			.where("world.id = :worldId AND sq.x = :x AND sq.y = :y", {worldId, x, y})
			.getMany();
	}

	async create(owner: UserEntity, name: string, avatarId: number): Promise<CharacterEntity> {
		const char = await this.characters.save(this.characters.create({
			square: await this.squares.findOne(1, 0, 0),
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
		if (data.avatarId) {
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

	async findMine(id: string): Promise<CharacterEntity> {
		const character = await this.createQuery()
			.where("owner.id = :user AND char.isActive = TRUE", {user: id})
			.getOne();
		if (character) {
			return character;
		} else {
			throw new Error("No active characters for this user!");
		}
	}

	private async createEquipment(character: CharacterEntity): Promise<EquipmentEntity> {
		return await this.equipments.save(this.equipments.create({
			player: character,
		}));
	}

	private createQuery(): SelectQueryBuilder<CharacterEntity> {
		return this.characters.createQueryBuilder("char")
			.leftJoinAndSelect("char.owner", "owner")
			.leftJoinAndSelect("char.avatar", "avatar")
			.leftJoinAndSelect("char.square", "sq")
			.leftJoinAndSelect("sq.world", "world")
			.leftJoinAndSelect("char.equipment", "equip")
			.leftJoinAndSelect("equip.headSlot", "head")
			.leftJoinAndSelect("head.item", "headItem")
			.leftJoinAndSelect("equip.chestSlot", "chest")
			.leftJoinAndSelect("chest.item", "chestItem")
			.leftJoinAndSelect("equip.beltSlot", "belt")
			.leftJoinAndSelect("belt.item", "beltItem")
			.leftJoinAndSelect("equip.bootSlot", "boot")
			.leftJoinAndSelect("boot.item", "bootItem")
			.leftJoinAndSelect("equip.leftHandSlot", "lHand")
			.leftJoinAndSelect("lHand.item", "lHandItem")
			.leftJoinAndSelect("equip.rightHandSlot", "rHand")
			.leftJoinAndSelect("rHand.item", "rHandItem")
			.leftJoinAndSelect("equip.ring1Slot", "ring1")
			.leftJoinAndSelect("ring1.item", "ring1Item")
			.leftJoinAndSelect("equip.ring2Slot", "ring2")
			.leftJoinAndSelect("ring2.item", "ring2Item")
			.leftJoinAndSelect("equip.neckSlot", "neck")
			.leftJoinAndSelect("neck.item", "neckItem")
			.leftJoinAndSelect("equip.bagSlot", "bag")
			.leftJoinAndSelect("bag.item", "bagItem")
			.leftJoinAndSelect("equip.artifactSlot", "artifact")
			.leftJoinAndSelect("artifact.item", "artifactItem");
	}
}
